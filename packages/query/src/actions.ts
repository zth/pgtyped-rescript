import { AsyncQueue, messages, PreparedObjectType } from '@pgtyped/wire';
import crypto from 'crypto';
import debugBase from 'debug';
import * as tls from 'tls';
import type {
  InterpolatedQuery,
  QueryParameter,
} from 'pgtyped-rescript-runtime';
import {
  checkServerFinalMessage,
  createClientSASLContinueResponse,
  createInitialSASLResponse,
} from './sasl-helpers.js';
import { DatabaseTypeKind, isEnum, MappableType } from './type.js';
import {
  parse,
  astVisitor,
  Expr,
  Statement,
  SelectStatement,
} from 'pgsql-ast-parser';

const debugQuery = debugBase('client:query');

export const generateHash = (
  username: string,
  password: string,
  salt: Buffer,
) => {
  const hash = (str: string) =>
    crypto.createHash('md5').update(str).digest('hex');
  const shadow = hash(password + username);
  const result = crypto.createHash('md5');
  result.update(shadow);
  result.update(salt);
  return 'md5' + result.digest('hex');
};

export async function startup(
  options: {
    host: string;
    password?: string;
    port: number;
    user: string;
    dbName: string;
    ssl?: tls.ConnectionOptions | boolean;
  },
  queue: AsyncQueue,
) {
  try {
    await queue.connect(options);
    const startupParams = {
      user: options.user,
      database: options.dbName,
      client_encoding: "'utf-8'",
    };
    await queue.send(messages.startupMessage, { params: startupParams });
    const result = await queue.reply(
      messages.readyForQuery,
      messages.authenticationCleartextPassword,
      messages.authenticationMD5Password,
      messages.authenticationSASL,
    );
    if ('trxStatus' in result) {
      // No auth required
      return;
    }
    if (!options.password) {
      throw new Error('password required for hash auth');
    }
    let password = options.password;
    if ('SASLMechanisms' in result) {
      if (result.SASLMechanisms?.indexOf('SCRAM-SHA-256') === -1) {
        throw new Error(
          'SASL: Only mechanism SCRAM-SHA-256 is currently supported',
        );
      }

      const { clientNonce, response: initialSASLResponse } =
        createInitialSASLResponse();
      await queue.send(messages.SASLInitialResponse, {
        mechanism: 'SCRAM-SHA-256',
        responseLength: Buffer.byteLength(initialSASLResponse),
        response: initialSASLResponse,
      });

      const SASLContinueResult = await queue.reply(
        messages.AuthenticationSASLContinue,
      );

      const { response: SASLContinueResponse, calculatedServerSignature } =
        createClientSASLContinueResponse(
          password,
          clientNonce,
          SASLContinueResult.SASLData,
        );

      await queue.send(messages.SASLResponse, {
        response: SASLContinueResponse,
      });

      const finalSASL = await queue.reply(messages.authenticationSASLFinal);
      await queue.reply(messages.authenticationOk);
      while (true) {
        const res = await queue.reply(
          messages.parameterStatus,
          messages.backendKeyData,
          messages.readyForQuery,
        );
        // break when we get readyForQuery
        if ('trxStatus' in res) {
          break;
        }
      }

      if ('SASLData' in finalSASL) {
        checkServerFinalMessage(finalSASL.SASLData, calculatedServerSignature);
        return;
      } else {
        throw new Error('SASL: No final SASL data returned');
      }
    }
    if ('salt' in result) {
      // hash password for md5 auth
      password = generateHash(options.user, password, result.salt);
    }
    // handles both cleartext and md5 password auth
    await queue.send(messages.passwordMessage, { password });
    await queue.reply(messages.authenticationOk);
    await queue.reply(messages.readyForQuery);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(`Connection failed: ${(e as any).message}`);
    process.exit(1);
  }
}

export async function runQuery(query: string, queue: AsyncQueue) {
  const resultRows = [];
  await queue.send(messages.query, { query });
  debugQuery('sent query %o', query);
  {
    const result = await queue.reply(messages.rowDescription);
    debugQuery(
      'received row description: %o',
      result.fields.map((c) => c.name.toString()),
    );
  }
  {
    while (true) {
      const result = await queue.reply(
        messages.dataRow,
        messages.commandComplete,
      );
      if ('commandTag' in result) {
        break;
      }
      const row = result.columns.map((c) => c.value.toString());
      resultRows.push(row);
      debugQuery('received row data: %o', row);
    }
  }
  return resultRows;
}

export interface IQueryTypes {
  paramMetadata: {
    mapping: QueryParameter[];
    params: MappableType[];
  };
  returnTypes: Array<{
    returnName: string;
    columnName: string;
    type: MappableType;
    nullable?: boolean;
    comment?: string;
    checkValues?: ConstraintValue[];
    defaultValue?: string;
  }>;
  inputTypes?: Record<string, IInputTypes>;
}

export interface IInputTypes {
  tableName: string;
  assignedIndex: number;
  multi: boolean;
  stringify: boolean;
  fields: Array<{
    columnName: string;
    type: MappableType;
    optional?: boolean;
    comment?: string;
    checkValues?: ConstraintValue[];
    defaultValue?: string;
  }>;
}

export interface IParseError {
  errorCode: string;
  hint?: string;
  message: string;
  position?: string;
}

interface TypeField {
  name: string;
  tableOID: number;
  columnAttrNumber: number;
  typeOID: number;
  typeSize: number;
  typeModifier: number;
  formatCode: number;
}

type TypeData =
  | {
      fields: Array<TypeField>;
      params: Array<{ oid: number }>;
    }
  | IParseError;

/**
 * Returns the raw query type data as returned by the Describe message
 * @param query query string, can only contain proper Postgres numeric placeholders
 * @param query name, should be unique per query body
 * @param queue
 */
export async function getTypeData(
  query: string,
  queue: AsyncQueue,
): Promise<TypeData> {
  const uniqueName = crypto.createHash('md5').update(query).digest('hex');
  // Send all the messages needed and then flush
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

  // Recover server state from any errors
  await queue.send(messages.sync, {});

  if ('fields' in parseResult) {
    // Error case
    const { fields: errorFields } = parseResult;
    return {
      errorCode: errorFields.R,
      hint: errorFields.H,
      message: errorFields.M,
      position: errorFields.P,
    };
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

enum TypeCategory {
  ARRAY = 'A',
  BOOLEAN = 'B',
  COMPOSITE = 'C',
  DATE_TIME = 'D',
  ENUM = 'E',
  GEOMETRIC = 'G',
  NETWORK_ADDRESS = 'I',
  NUMERIC = 'N',
  PSEUDO = 'P',
  STRING = 'S',
  TIMESPAN = 'T',
  USERDEFINED = 'U',
  BITSTRING = 'V',
  UNKNOWN = 'X',
}

interface TypeRow {
  oid: string;
  typeName: string;
  typeKind: string;
  enumLabel: string;
  typeCategory?: TypeCategory;
  elementTypeOid?: string;
}

// Aggregate rows from database types catalog into MappableTypes
export function reduceTypeRows(
  typeRows: TypeRow[],
): Record<string, MappableType> {
  const enumTypes = typeRows
    .filter((r) => r.typeKind === DatabaseTypeKind.Enum)
    .reduce((typeMap, { oid, typeName, enumLabel }) => {
      const typ = typeMap[oid] ?? typeName;

      // We should get one row per enum value
      return {
        ...typeMap,
        [oid]: {
          name: typeName,
          // Merge enum values
          enumValues: [...(isEnum(typ) ? typ.enumValues : []), enumLabel],
        },
      };
    }, {} as Record<string, MappableType>);
  return typeRows.reduce(
    (typeMap, { oid, typeName, typeCategory, elementTypeOid }) => {
      // Attempt to merge any partially defined types
      const typ = typeMap[oid] ?? typeName;

      if (oid in enumTypes) {
        return { ...typeMap, [oid]: enumTypes[oid] };
      }

      if (
        typeCategory === TypeCategory.ARRAY &&
        elementTypeOid &&
        elementTypeOid in enumTypes
      ) {
        return {
          ...typeMap,
          [oid]: {
            name: typeName,
            elementType: enumTypes[elementTypeOid],
          },
        };
      }

      return { ...typeMap, [oid]: typ };
    },
    {} as Record<string, MappableType>,
  );
}

async function getCheckConstraints(
  fields: TypeField[],
  queue: AsyncQueue,
): Promise<ColumnCheck[]> {
  const columnFields = fields.filter((f) => f.columnAttrNumber > 0);
  if (columnFields.length === 0) {
    return [];
  }

  const tableOids = Array.from(
    new Set(columnFields.map((f) => f.tableOID)),
  ).join(',');

  let rows: string[][] = [];

  try {
    rows = await runQuery(
      `
      SELECT 
        conrelid, unnest(conkey) AS attnum, 
        pg_get_expr(conbin, conrelid)
     FROM 
        pg_constraint 
     WHERE 
        contype='c' AND 
        conrelid IN (${tableOids}) AND 
        conname NOT LIKE 'pg_%%';`,
      queue,
    );
  } catch {
    // Ignore
  }

  return rows
    .map(([relid, attnum, def]) => ({
      tableOID: Number(relid),
      columnAttrNumber: Number(attnum),
      values: parseCheckAllowedValues(def) ?? [],
    }))
    .filter((r) => r.values.length > 0);
}

// TODO: self-host
async function runTypesCatalogQuery(
  typeOIDs: number[],
  queue: AsyncQueue,
): Promise<TypeRow[]> {
  let rows: any[];
  if (typeOIDs.length > 0) {
    const concatenatedTypeOids = typeOIDs.join(',');
    rows = await runQuery(
      `
SELECT pt.oid, pt.typname, pt.typtype, pe.enumlabel, pt.typelem, pt.typcategory
FROM pg_type pt
LEFT JOIN pg_enum pe ON pt.oid = pe.enumtypid
WHERE pt.oid IN (${concatenatedTypeOids})
OR pt.oid IN (SELECT typelem FROM pg_type ptn WHERE ptn.oid IN (${concatenatedTypeOids}));
`,
      queue,
    );
  } else {
    rows = [];
  }
  return rows.map(
    ([oid, typeName, typeKind, enumLabel, elementTypeOid, typeCategory]) => ({
      oid,
      typeName: toRescriptName(typeName),
      typeKind,
      enumLabel,
      elementTypeOid,
      typeCategory,
    }),
  );
}

interface ColumnCheck {
  tableOID: number;
  columnAttrNumber: number;
  values: ConstraintValue[];
}

export type ConstraintValue =
  | {
      type: 'string';
      value: string;
      alias?: string;
      context?: string;
    }
  | {
      type: 'integer';
      value: number;
      alias?: string;
      context?: string;
    };

export function parseCheckAllowedValues(def: string): ConstraintValue[] | null {
  try {
    // Wrap the constraint expression in a valid SQL statement context
    // so the AST parser can parse it properly
    const wrappedQuery = `SELECT NULL WHERE ${def}`;
    const ast = parse(wrappedQuery);
    const values: ConstraintValue[] = [];
    let hadInvalidValue = false;

    const visitor = astVisitor((map) => ({
      constant: (node) => {
        if (node.type === 'string' && 'value' in node) {
          values.push({ type: 'string', value: node.value });
          /*
        Can't represent floats as polyvariants in ReScript, so ignore for now. 
        Unboxed variants would support this though, but we'd need a global schema
        file probably.
        
        } else if (node.type === 'numeric' && 'value' in node) {
          values.push({ type: 'float', value: node.value });*/
        } else if (
          node.type === 'integer' &&
          'value' in node &&
          node.value >= 0
        ) {
          values.push({ type: 'integer', value: node.value });
        } else {
          hadInvalidValue = true;
        }
        map.super().constant(node);
      },
    }));

    const disallowReasons: string[] = [];

    const select = ast[0];
    const where = 'where' in select ? select.where : null;

    if (where != null) {
      if (
        where.type === 'binary' &&
        where.op === '=' &&
        where.left.type === 'ref'
      ) {
        // TODO: Match on the ref type so it matches the column name?
        const rhs = where.right;
        let targetNode: Expr | null = null;

        if (rhs.type === 'call' && rhs.function.name === 'any') {
          // Check args
          if (rhs.args.length === 1) {
            targetNode = rhs.args[0];
          } else {
            disallowReasons.push('ANY with multiple args');
          }
        } else {
          disallowReasons.push('NOT ANY');
        }

        if (targetNode != null) {
          visitor.expr(targetNode);
        }
      } else {
        disallowReasons.push('Check constraint too complex');
      }
    }

    if (disallowReasons.length > 0) {
      /*console.warn('NOT ALLOWED', {
        disallowReasons,
        wrappedQuery,
      });*/
    }

    return values.length > 0 && !hadInvalidValue ? values : null;
  } catch {
    // Ignore
    return null;
  }
}

interface ColumnComment {
  tableOID: number;
  columnAttrNumber: number;
  comment: string;
}

interface ColumnDefault {
  tableOID: number;
  columnAttrNumber: number;
  defaultValue: string | null;
}

async function getComments(
  fields: TypeField[],
  queue: AsyncQueue,
): Promise<ColumnComment[]> {
  const columnFields = fields.filter((f) => f.columnAttrNumber > 0);
  if (columnFields.length === 0) {
    return [];
  }

  const matchers = columnFields.map(
    (f) => `(objoid=${f.tableOID} and objsubid=${f.columnAttrNumber})`,
  );
  const selection = matchers.join(' or ');

  const descriptionRows = await runQuery(
    `SELECT
      objoid, objsubid, description
     FROM pg_description WHERE ${selection};`,
    queue,
  );

  return descriptionRows.map((row) => ({
    tableOID: Number(row[0]),
    columnAttrNumber: Number(row[1]),
    comment: row[2],
  }));
}

async function getDefaults(
  fields: TypeField[],
  queue: AsyncQueue,
): Promise<ColumnDefault[]> {
  const columnFields = fields.filter((f) => f.columnAttrNumber > 0);
  if (columnFields.length === 0) {
    return [];
  }

  const tableOids = Array.from(
    new Set(columnFields.map((f) => f.tableOID)),
  ).join(',');

  const defaultRows = await runQuery(
    `SELECT
      attrelid, attnum, atthasdef, 
      CASE WHEN atthasdef THEN pg_get_expr(adbin, attrelid) ELSE NULL END as default_value
     FROM pg_attribute a
     LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid AND a.attnum = ad.adnum
     WHERE a.attrelid IN (${tableOids}) 
       AND a.attnum > 0 
       AND NOT a.attisdropped;`,
    queue,
  );

  return defaultRows.map((row) => ({
    tableOID: Number(row[0]),
    columnAttrNumber: Number(row[1]),
    defaultValue: row[3],
  }));
}

export function getAliasedLiterals(
  ast: Statement[],
): Map<string, ConstraintValue[]> {
  const values: ConstraintValue[] = [];
  const aliasesWithInvalidValues = new Set<string>();
  const topStatement = ast[0];

  if (topStatement.type === 'union' || topStatement.type === 'union all') {
    const unionContext = 'union';

    const collectFromSelect = (selectNode: SelectStatement) => {
      const visitor = astVisitor((v) => ({
        selectionColumn: (node) => {
          const { alias, expr } = node;
          if (alias != null) {
            if (expr.type === 'string' && 'value' in expr) {
              values.push({
                type: 'string',
                value: expr.value,
                alias: alias.name,
                context: unionContext,
              });
            } else if (
              expr.type === 'integer' &&
              'value' in expr &&
              expr.value >= 0
            ) {
              values.push({
                type: 'integer',
                value: expr.value,
                alias: alias.name,
                context: unionContext,
              });
            } else {
              aliasesWithInvalidValues.add(alias.name);
            }
          }
          v.super().selectionColumn(node);
        },
      }));
      visitor.select(selectNode);
    };

    // Helper to traverse union nodes
    const traverseUnion = (node: Expr) => {
      if (node.type === 'select') {
        collectFromSelect(node);
      } else if (node.type === 'union' || node.type === 'union all') {
        traverseUnion(node.left);
        traverseUnion(node.right);
      }
    };

    traverseUnion(topStatement);
  } else {
    if (topStatement.type === 'select') {
      // Do not traverse any nested structure.
      const columns = topStatement.columns || [];
      for (const column of columns) {
        if (column.alias && column.expr) {
          const { alias, expr } = column;
          if (expr.type === 'string' && 'value' in expr) {
            values.push({
              type: 'string',
              value: expr.value,
              alias: alias.name,
              context: 'select',
            });
          } else if (
            expr.type === 'integer' &&
            'value' in expr &&
            expr.value >= 0
          ) {
            values.push({
              type: 'integer',
              value: expr.value,
              alias: alias.name,
              context: 'select',
            });
          } else {
            aliasesWithInvalidValues.add(alias.name);
          }
        }
      }
    }
  }

  const map = new Map<string, ConstraintValue[]>();
  for (const v of values) {
    const key = v.alias!;
    if (map.has(key)) {
      const existing = map.get(key)!;

      // Only accumulate if from the same context (same logical level)
      const sameContext =
        existing.length > 0 && existing[0].context === v.context;
      if (sameContext) {
        // Only add if the value isn't already present (avoid true duplicates)
        const isDuplicate = existing.some(
          (e) => e.type === v.type && e.value === v.value,
        );
        if (!isDuplicate) {
          existing.push(v);
        }
      } else {
        // Different contexts means different logical meanings, skip inference
        map.delete(key);
      }
    } else {
      map.set(key, [v]);
    }
  }

  // Opt out of literal inference for aliases with some non-literal values.
  // In the future this could be extended to use unboxed variants, and we could capture the
  // "other" value efficiently as a catch-all.
  for (const alias of aliasesWithInvalidValues) {
    map.delete(alias);
  }

  return map;
}

async function extraParameterInfo(query: Statement[]) {
  const paramsInfo = new Map<
    number,
    {
      recordName: string;
      assignedIndex: number;
      multi: boolean;
      stringify: boolean;
    }
  >();

  const visitor = astVisitor((v) => ({
    select: async (s) => {
      if ('from' in s) {
        const from = s.from;
        if (Array.isArray(from) && from.length === 1) {
          const frm = from[0];
          if (
            frm.type === 'call' &&
            (frm.function.name === 'json_populate_recordset' ||
              frm.function.name === 'jsonb_populate_recordset' ||
              frm.function.name === 'json_populate_record' ||
              frm.function.name === 'jsonb_populate_record')
          ) {
            const [arg1, arg2] = frm.args;
            if (
              arg1.type === 'cast' &&
              arg1.operand.type === 'null' &&
              'name' in arg1.to &&
              arg2.type === 'parameter' &&
              'name' in arg2
            ) {
              const assignedIndex = parseInt(arg2.name.slice(1), 10);
              const name = arg1.to.name;
              paramsInfo.set(assignedIndex, {
                recordName: name,
                assignedIndex,
                multi:
                  frm.function.name === 'json_populate_recordset' ||
                  frm.function.name === 'jsonb_populate_recordset',
                stringify: true,
              });
            }
          }
        }
      }

      v.super().select(s);
    },
  }));

  visitor.statement(query[0]);
  return paramsInfo;
}

export async function getTypes(
  queryData: InterpolatedQuery,
  queue: AsyncQueue,
): Promise<IQueryTypes | IParseError> {
  const typeData = await getTypeData(queryData.query, queue);
  if ('errorCode' in typeData) {
    return typeData;
  }

  const { params, fields } = typeData;

  const paramTypeOIDs = params.map((p) => p.oid);
  const returnTypesOIDs = fields.map((f) => f.typeOID);
  const usedTypesOIDs = paramTypeOIDs.concat(returnTypesOIDs);
  const typeRows = await runTypesCatalogQuery(usedTypesOIDs, queue);
  const commentRows = await getComments(fields, queue);
  const checkRows = await getCheckConstraints(fields, queue);
  const typeMap = reduceTypeRows(typeRows);
  const parsedQuery = parse(queryData.query);
  const aliasedLiterals = getAliasedLiterals(parsedQuery);
  const paramsInfo = await extraParameterInfo(parsedQuery);

  const attrMatcher = ({
    tableOID,
    columnAttrNumber,
  }: {
    tableOID: number;
    columnAttrNumber: number;
  }) => `(attrelid = ${tableOID} and attnum = ${columnAttrNumber})`;

  const attrSelection =
    fields.length > 0 ? fields.map(attrMatcher).join(' or ') : false;

  const attributeRows = await runQuery(
    `SELECT
      (attrelid || ':' || attnum) AS attid, attname, attnotnull
     FROM pg_attribute WHERE ${attrSelection};`,
    queue,
  );
  const attrMap: {
    [attid: string]: {
      columnName: string;
      nullable: boolean;
    };
  } = attributeRows.reduce(
    (acc, [attid, attname, attnotnull]) => ({
      ...acc,
      [attid]: {
        columnName: attname,
        nullable: attnotnull !== 't',
      },
    }),
    {},
  );

  const getAttid = (col: Pick<TypeField, 'tableOID' | 'columnAttrNumber'>) =>
    `${col.tableOID}:${col.columnAttrNumber}`;

  const commentMap: { [attid: string]: string | undefined } = {};
  for (const c of commentRows) {
    commentMap[`${c.tableOID}:${c.columnAttrNumber}`] = c.comment;
  }
  const checkMap: { [attid: string]: ConstraintValue[] } = {};
  for (const chk of checkRows) {
    checkMap[`${chk.tableOID}:${chk.columnAttrNumber}`] = chk.values;
  }

  const returnTypes = fields
    .map((f) => ({
      ...attrMap[getAttid(f)],
      ...(commentMap[getAttid(f)] ? { comment: commentMap[getAttid(f)] } : {}),
      ...(checkMap[getAttid(f)] ? { checkValues: checkMap[getAttid(f)] } : {}),
      returnName: f.name,
      type: typeMap[f.typeOID],
    }))
    .map((f) => {
      const aliasedValues = aliasedLiterals.get(f.returnName);
      if (aliasedValues != null) {
        // Aliased literals are not nullable by definition
        f.nullable = false;
        f.checkValues = aliasedValues;
        return f;
      } else {
        return f;
      }
    });

  const inputTypes: Record<string, IInputTypes> = {};

  if (paramsInfo.size > 0) {
    for (const [_, { recordName, assignedIndex, multi }] of paramsInfo) {
      const paramTypeInfo = await getInputType(
        recordName,
        assignedIndex,
        queue,
      );
      if ('errorCode' in paramTypeInfo) {
        // Ignore errors for now
      } else {
        inputTypes[assignedIndex] = { ...paramTypeInfo, multi };
      }
    }
  }

  const processedMapping = queryData.mapping.map((param) => {
    if (
      'assignedIndex' in param &&
      !Array.isArray(param.assignedIndex) &&
      paramsInfo.has(param.assignedIndex)
    ) {
      const paramInfo = paramsInfo.get(param.assignedIndex)!;

      return {
        type: 'inputTypeReference' as const,
        tableName: paramInfo.recordName,
        assignedIndex: param.assignedIndex,
        name: param.name,
        stringify: paramInfo.stringify,
      };
    }
    return param;
  });

  const paramMetadata = {
    params: params.map(({ oid }) => typeMap[oid]),
    mapping: processedMapping,
  };

  return { paramMetadata, returnTypes, inputTypes };
}

export async function getInputType(
  tableName: string,
  assignedIndex: number,
  queue: AsyncQueue,
): Promise<IInputTypes | IParseError> {
  try {
    // First, get the table OID
    const tableOidRows = await runQuery(
      `SELECT oid FROM pg_class WHERE relname = '${tableName}' AND relkind = 'r';`,
      queue,
    );

    if (tableOidRows.length === 0) {
      return {
        errorCode: 'TABLE_NOT_FOUND',
        message: `Table '${tableName}' not found`,
      };
    }

    const tableOID = Number(tableOidRows[0][0]);

    // Get all columns for the table
    const columnRows = await runQuery(
      `SELECT 
        attrelid as table_oid,
        attnum as column_attr_number, 
        atttypid as type_oid,
        attname as name,
        attnotnull,
        atthasdef
       FROM pg_attribute 
       WHERE attrelid = ${tableOID}
         AND attnum > 0 
         AND NOT attisdropped
       ORDER BY attnum;`,
      queue,
    );

    if (columnRows.length === 0) {
      return {
        errorCode: 'NO_COLUMNS_FOUND',
        message: `No columns found for table '${tableName}'`,
      };
    }

    // Create TypeField-like objects for compatibility with existing functions
    const fields = columnRows.map((row) => ({
      name: row[3], // attname
      tableOID: Number(row[0]), // attrelid
      columnAttrNumber: Number(row[1]), // attnum
      typeOID: Number(row[2]), // atttypid
      typeSize: 0, // not needed for input types
      typeModifier: 0, // not needed for input types
      formatCode: 0, // not needed for input types
    }));

    // Get type information
    const returnTypesOIDs = fields.map((f) => f.typeOID);
    const typeRows = await runTypesCatalogQuery(returnTypesOIDs, queue);
    const commentRows = await getComments(fields, queue);
    const checkRows = await getCheckConstraints(fields, queue);
    const defaultRows = await getDefaults(fields, queue);
    const typeMap = reduceTypeRows(typeRows);

    const getAttid = (col: Pick<TypeField, 'tableOID' | 'columnAttrNumber'>) =>
      `${col.tableOID}:${col.columnAttrNumber}`;

    // Create maps for lookups
    const commentMap: { [attid: string]: string | undefined } = {};
    for (const c of commentRows) {
      commentMap[`${c.tableOID}:${c.columnAttrNumber}`] = c.comment;
    }
    const checkMap: { [attid: string]: ConstraintValue[] } = {};
    for (const chk of checkRows) {
      checkMap[`${chk.tableOID}:${chk.columnAttrNumber}`] = chk.values;
    }
    const defaultMap: { [attid: string]: ColumnDefault } = {};
    for (const def of defaultRows) {
      defaultMap[`${def.tableOID}:${def.columnAttrNumber}`] = def;
    }

    // Build input types - key difference: optionality based on NOT NULL + defaults
    const inputTypes = fields.map((f, index) => {
      const hasDefault = !!defaultMap[getAttid(f)]?.defaultValue;
      const isNotNull = columnRows[index][4] === 't'; // attnotnull

      return {
        columnName: f.name,
        type: typeMap[f.typeOID],
        // Column is optional if it has a default OR allows NULL
        optional: hasDefault || !isNotNull,
        ...(commentMap[getAttid(f)]
          ? { comment: commentMap[getAttid(f)] }
          : {}),
        ...(checkMap[getAttid(f)]
          ? { checkValues: checkMap[getAttid(f)] }
          : {}),
        ...(defaultMap[getAttid(f)]?.defaultValue
          ? { defaultValue: defaultMap[getAttid(f)].defaultValue! }
          : {}),
      };
    });

    return {
      tableName,
      assignedIndex,
      multi: false,
      fields: inputTypes,
      stringify: true,
    };
  } catch (error) {
    return {
      errorCode: 'QUERY_ERROR',
      message: `Error querying table '${tableName}': ${(error as any).message}`,
    };
  }
}

function toRescriptName(name: string): string {
  if (name == null || name.length === 0) {
    return name;
  }

  return `${name[0]?.toLowerCase() ?? ''}${name.slice(1)}`;
}
