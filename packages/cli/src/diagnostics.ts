import {
  parseSQLFile,
  queryASTToIR,
  SQLQueryIR,
  TransformType,
} from '@pgtyped/parser';
import { AsyncQueue, messages, PreparedObjectType } from '@pgtyped/wire';
import crypto from 'crypto';
import fs from 'fs-extra';
import pg from 'pg';
import { processSQLQueryIR, QueryParameters } from 'pgtyped-rescript-runtime';
import { startup } from 'pgtyped-rescript-query';
import { ParsedConfig } from './config.js';

// tslint:disable:no-console

const { Client } = pg;

export type DiagnosticsMode = 'describe' | 'explain' | 'analyze';
export type DiagnosticsFormat = 'text' | 'table' | 'json';

export interface DiagnosticsOptions {
  file: string;
  queryName?: string;
  params?: string;
  paramsFile?: string;
  mode: DiagnosticsMode;
  format: DiagnosticsFormat;
  list?: boolean;
  sql?: boolean;
  timeout?: string;
}

interface FieldData {
  name: string;
  tableOID: number;
  columnAttrNumber: number;
  typeOID: number;
  typeSize: number;
  typeModifier: number;
  formatCode: number;
}

interface DescribeData {
  params: Array<{ oid: number }>;
  fields: FieldData[];
}

interface ParseError {
  errorCode: string;
  hint?: string;
  message: string;
  position?: string;
}

type TypeData = DescribeData | ParseError;

interface ErrorFields {
  C?: string;
  H?: string;
  M: string;
  P?: string;
  R: string;
}

interface TypeMetadata {
  oid: number;
  name: string;
}

interface ColumnMetadata {
  tableOID: number;
  columnAttrNumber: number;
  tableName: string;
  columnName: string;
}

function parseParams(
  params: string | undefined,
  paramsFile: string | undefined,
): QueryParameters | undefined {
  if (params && paramsFile) {
    throw new Error('--params and --params-file are mutually exclusive');
  }

  if (!params && !paramsFile) {
    return undefined;
  }

  const json = params ?? fs.readFileSync(paramsFile as string, 'utf-8');
  const parsed = JSON.parse(json);
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Parameters must be a JSON object');
  }

  return parsed as QueryParameters;
}

function isParseError(value: unknown): value is ParseError {
  return (
    value != null &&
    typeof value === 'object' &&
    'message' in value &&
    'errorCode' in value
  );
}

export function parseErrorFields(errorFields: ErrorFields): ParseError {
  return {
    errorCode: errorFields.C ?? errorFields.R,
    hint: errorFields.H,
    message: errorFields.M,
    position: errorFields.P,
  };
}

async function getTypeData(
  query: string,
  queue: AsyncQueue,
): Promise<TypeData> {
  const uniqueName = crypto.createHash('md5').update(query).digest('hex');

  await queue.send(messages.parse, {
    name: uniqueName,
    query,
    dataTypes: [],
  });
  await queue.send(messages.describe, {
    name: uniqueName,
    type: PreparedObjectType.Statement,
  });
  await queue.send(messages.close, {
    target: PreparedObjectType.Statement,
    targetName: uniqueName,
  });
  await queue.send(messages.flush, {});

  const parseResult = await queue.reply(
    messages.errorResponse,
    messages.parseComplete,
  );

  await queue.send(messages.sync, {});

  if ('fields' in parseResult) {
    return parseErrorFields(parseResult.fields);
  }

  const paramsResult = await queue.reply(
    messages.parameterDescription,
    messages.noData,
  );
  const params = 'params' in paramsResult ? paramsResult.params : [];
  const fieldsResult = await queue.reply(
    messages.rowDescription,
    messages.noData,
  );
  const fields = 'fields' in fieldsResult ? fieldsResult.fields : [];
  await queue.reply(messages.closeComplete);
  return { params, fields };
}

async function describeQuery(query: string, config: ParsedConfig) {
  const queue = new AsyncQueue();
  try {
    await startup(config.db, queue);
    return await getTypeData(query, queue);
  } finally {
    queue.socket.end();
  }
}

function createPgClient(config: ParsedConfig) {
  return new Client({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.dbName,
    ssl: config.db.ssl,
  });
}

function parseTimeout(timeout: string | undefined): number | undefined {
  if (!timeout) {
    return undefined;
  }

  const match = /^(\d+)(ms|s|min)?$/.exec(timeout);
  if (!match) {
    throw new Error('--timeout must look like 500ms, 5s, or 1min');
  }

  const value = Number(match[1]);
  const unit = match[2] ?? 'ms';
  switch (unit) {
    case 'ms':
      return value;
    case 's':
      return value * 1000;
    case 'min':
      return value * 60 * 1000;
    default:
      return value;
  }
}

function makeExplainQuery(
  query: string,
  mode: DiagnosticsMode,
  format: DiagnosticsFormat,
) {
  const options = [
    mode === 'analyze' ? 'ANALYZE' : undefined,
    mode === 'analyze' ? 'BUFFERS' : undefined,
    format === 'json' ? 'FORMAT JSON' : undefined,
  ].filter(Boolean);

  return options.length > 0
    ? `EXPLAIN (${options.join(', ')}) ${query}`
    : `EXPLAIN ${query}`;
}

async function runExplain(
  query: string,
  bindings: unknown[],
  config: ParsedConfig,
  mode: DiagnosticsMode,
  format: DiagnosticsFormat,
  timeout: string | undefined,
) {
  const client = createPgClient(config);

  await client.connect();
  try {
    const timeoutMs = parseTimeout(timeout);
    if (timeoutMs != null) {
      await client.query(`SET statement_timeout = ${timeoutMs}`);
    }

    return await client.query({
      text: makeExplainQuery(query, mode, format),
      values: bindings,
    });
  } finally {
    await client.end();
  }
}

async function fetchTypeMetadata(
  oids: number[],
  config: ParsedConfig,
): Promise<Map<number, string>> {
  if (oids.length === 0) {
    return new Map();
  }

  const client = createPgClient(config);
  await client.connect();
  try {
    const result = await client.query<TypeMetadata>({
      text: `
        SELECT oid, format_type(oid, NULL) AS name
        FROM pg_type
        WHERE oid = ANY($1::oid[])
      `,
      values: [oids],
    });
    return new Map(result.rows.map((row) => [Number(row.oid), row.name]));
  } finally {
    await client.end();
  }
}

async function fetchColumnMetadata(
  fields: FieldData[],
  config: ParsedConfig,
): Promise<Map<string, ColumnMetadata>> {
  const refs = fields
    .filter((field) => field.tableOID > 0 && field.columnAttrNumber > 0)
    .map((field) => ({
      tableOID: field.tableOID,
      columnAttrNumber: field.columnAttrNumber,
    }));

  if (refs.length === 0) {
    return new Map();
  }

  const client = createPgClient(config);
  await client.connect();
  try {
    const result = await client.query<ColumnMetadata>({
      text: `
        SELECT
          c.oid AS "tableOID",
          a.attnum AS "columnAttrNumber",
          c.relname AS "tableName",
          a.attname AS "columnName"
        FROM pg_class c
        JOIN pg_attribute a ON a.attrelid = c.oid
        WHERE (c.oid::int, a.attnum::int) IN (
          SELECT
            (value->>'tableOID')::int,
            (value->>'columnAttrNumber')::int
          FROM jsonb_array_elements($1::jsonb)
        )
      `,
      values: [JSON.stringify(refs)],
    });
    return new Map(
      result.rows.map((row) => [
        `${row.tableOID}:${row.columnAttrNumber}`,
        row,
      ]),
    );
  } finally {
    await client.end();
  }
}

export function getParameterLabels(
  queryIR: SQLQueryIR,
  params: QueryParameters | undefined,
): Map<number, string> {
  const labels = new Map<number, string>();
  const usedParams = getUsedParams(queryIR);
  let index = 1;

  for (const param of usedParams) {
    switch (param.transform.type) {
      case TransformType.Scalar:
        labels.set(index++, param.name);
        break;

      case TransformType.ArraySpread: {
        const value = params?.[param.name];
        if (Array.isArray(value)) {
          value.forEach(() => labels.set(index++, param.name));
        } else {
          labels.set(index++, param.name);
        }
        break;
      }

      case TransformType.PickTuple:
        for (const key of param.transform.keys) {
          labels.set(index++, `${param.name}.${key.name}`);
        }
        break;

      case TransformType.PickArraySpread: {
        const value = params?.[param.name];
        if (Array.isArray(value)) {
          value.forEach(() => {
            if (param.transform.type === TransformType.PickArraySpread) {
              param.transform.keys.forEach((key) =>
                labels.set(index++, `${param.name}.${key.name}`),
              );
            }
          });
        } else {
          param.transform.keys.forEach((key) =>
            labels.set(index++, `${param.name}.${key.name}`),
          );
        }
        break;
      }
    }
  }

  return labels;
}

function getUsedParams(queryIR: SQLQueryIR) {
  return queryIR.params.filter((param) => param.name in queryIR.usedParamSet);
}

function pad(value: string, width: number) {
  return value.padEnd(width, ' ');
}

function printRows(headers: string[], rows: string[][]) {
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...rows.map((row) => row[index].length)),
  );

  console.log(
    headers.map((header, index) => pad(header, widths[index])).join('  '),
  );
  console.log(widths.map((width) => '-'.repeat(width)).join('  '));

  for (const row of rows) {
    console.log(
      row.map((value, index) => pad(value, widths[index])).join('  '),
    );
  }
}

async function printDescribeResult(
  result: Awaited<ReturnType<typeof describeQuery>>,
  config: ParsedConfig,
  format: DiagnosticsFormat,
  parameterLabels: Map<number, string>,
) {
  if (isParseError(result)) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  const describeData = result as DescribeData;
  const typeOids = [
    ...describeData.params.map((param) => param.oid),
    ...describeData.fields.map((field) => field.typeOID),
  ];
  const [typeNames, columnMetadata] = await Promise.all([
    fetchTypeMetadata(typeOids, config),
    fetchColumnMetadata(describeData.fields, config),
  ]);

  const enriched = {
    parameters: describeData.params.map((param, index) => ({
      position: index + 1,
      name: parameterLabels.get(index + 1),
      type: typeNames.get(param.oid) ?? String(param.oid),
      oid: param.oid,
    })),
    fields: describeData.fields.map((field) => {
      const column = columnMetadata.get(
        `${field.tableOID}:${field.columnAttrNumber}`,
      );
      return {
        name: field.name,
        type: typeNames.get(field.typeOID) ?? String(field.typeOID),
        oid: field.typeOID,
        source: column ? `${column.tableName}.${column.columnName}` : undefined,
      };
    }),
  };

  if (format === 'json') {
    console.log(JSON.stringify(enriched, null, 2));
    return;
  }

  if (enriched.parameters.length > 0) {
    console.log('Parameters');
    printRows(
      ['Position', 'Name', 'Type', 'OID'],
      enriched.parameters.map((param) => [
        `$${param.position}`,
        param.name ?? '',
        param.type,
        String(param.oid),
      ]),
    );
  } else {
    console.log('Parameters: none');
  }

  console.log('');
  if (enriched.fields.length > 0) {
    console.log('Result columns');
    printRows(
      ['Name', 'Type', 'Source', 'OID'],
      enriched.fields.map((field) => [
        field.name,
        field.type,
        field.source ?? '',
        String(field.oid),
      ]),
    );
    return;
  }

  console.log('Result columns: none');
}

function printExplainResult(
  result: Awaited<ReturnType<typeof runExplain>>,
  format: DiagnosticsFormat,
) {
  if (format === 'json') {
    console.log(JSON.stringify(result.rows[0]['QUERY PLAN'][0], null, 2));
    return;
  }

  for (const row of result.rows) {
    console.log(row['QUERY PLAN']);
  }
}

export async function runDiagnostics(
  config: ParsedConfig | undefined,
  options: DiagnosticsOptions,
) {
  const fileContents = (await fs.readFile(options.file, 'utf-8')).replace(
    /\r\n/g,
    '\n',
  );
  const parsed = parseSQLFile(fileContents);

  if (parsed.events.length > 0) {
    console.error(JSON.stringify(parsed.events, null, 2));
  }

  if (parsed.queries.length === 0) {
    throw new Error(`No queries found in ${options.file}`);
  }

  if (options.list) {
    parsed.queries.forEach((parsedQuery) => console.log(parsedQuery.name));
    return;
  }

  const query =
    options.queryName == null && parsed.queries.length === 1
      ? parsed.queries[0]
      : parsed.queries.find((q) => q.name === options.queryName);

  if (!query) {
    const names = parsed.queries.map((q) => q.name).join(', ');
    throw new Error(`Query not found. Available queries: ${names}`);
  }

  const params = parseParams(options.params, options.paramsFile);
  const queryIR = queryASTToIR(query, null);

  if (
    !options.sql &&
    options.mode !== 'describe' &&
    getUsedParams(queryIR).length > 0 &&
    !params
  ) {
    throw new Error(
      'EXPLAIN diagnostics for parameterized queries require --params',
    );
  }

  const processed = processSQLQueryIR(queryIR, params);

  if (options.sql) {
    console.log(processed.query);
    return;
  }

  if (options.mode === 'describe') {
    if (!config) {
      throw new Error('Config file required for describe diagnostics');
    }

    const describeResult = await describeQuery(processed.query, config);
    await printDescribeResult(
      describeResult,
      config,
      options.format,
      getParameterLabels(queryIR, params),
    );
    return;
  }

  if (!config) {
    throw new Error('Config file required for explain diagnostics');
  }

  const explainResult = await runExplain(
    processed.query,
    processed.bindings,
    config,
    options.mode,
    options.format,
    options.timeout,
  );
  printExplainResult(explainResult, options.format);
}
