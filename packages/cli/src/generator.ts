import {
  ParameterTransform,
  processSQLQueryIR,
  processTSQueryAST,
} from 'pgtyped-rescript-runtime';

import {
  parseSQLFile,
  prettyPrintEvents,
  queryASTToIR,
  SQLQueryAST,
  SQLQueryIR,
  TSQueryAST,
  InputParamTransforms,
} from '@pgtyped/parser';

import { getTypes, TypeSource } from 'pgtyped-rescript-query';
import { camelCase } from 'camel-case';
import { pascalCase } from 'pascal-case';
import path from 'path';
import { ParsedConfig } from './config.js';
import { TypeAllocator, TypeMapping, TypeScope } from './types.js';
import { parseCode as parseRescriptFile } from './parseRescript.js';
import {
  IQueryTypes,
  ConstraintValue,
} from 'pgtyped-rescript-query/lib/actions';

export enum ProcessingMode {
  SQL = 'sql-file',
  TS = 'query-file',
}

export interface IField {
  optional?: boolean;
  fieldName: string;
  fieldType: string;
  comment?: string;
}

/**
 * Generates a ReScript polyvariant type from check values
 * e.g., [#"value1" | #"value2" | #42]
 */
function generatePolyvariant(checkValues: ConstraintValue[]): string {
  return `[${checkValues
    .map((v) => {
      switch (v.type) {
        case 'string':
          return `#"${v.value}"`;
        case 'integer':
          return `#${v.value}`;
      }
    })
    .join(' | ')}]`;
}

/**
 * Wraps a type in option<> if needed
 */
function wrapInOption(typeName: string, shouldWrap: boolean): string {
  return shouldWrap ? `option<${typeName}>` : typeName;
}

/**
 * Wraps a type in array<> if needed
 */
function wrapInArray(typeName: string, shouldWrap: boolean): string {
  return shouldWrap ? `array<${typeName}>` : typeName;
}

/**
 * Generates a ReScript record type from fields
 */
function generateRecordType(
  fields: Array<{ name: string; type: string; required?: boolean }>,
): string {
  const fieldStrings = fields.map((field) => {
    const optional = field.required === false ? '?' : '';
    return `  ${getFieldName(field.name)}${optional}: ${field.type}`;
  });
  return `{\n${fieldStrings.join(',\n')}\n}`;
}

/**
 * Generates a complete ReScript record interface with @gentype annotation
 */
function generateInterface(interfaceName: string, fields: IField[]): string {
  const sortedFields = fields
    .slice()
    .sort((a, b) => a.fieldName.localeCompare(b.fieldName));
  const contents = sortedFields
    .map(
      ({ fieldName, fieldType, comment, optional }) =>
        (comment ? `  /** ${escapeComment(comment)} */\n` : '') +
        `  ${getFieldName(fieldName)}${optional ? '?' : ''}: ${fieldType},`,
    )
    .join('\n');
  return `@gentype\ntype ${interfaceName} = {\n${contents}\n}\n\n`;
}

/**
 * Generates a ReScript type alias with @gentype annotation
 */
function generateTypeAlias(typeName: string, alias: string): string {
  return `@gentype\ntype ${typeName} = ${alias}\n\n`;
}

/**
 * Processes a type with check values, returning either the original type or a polyvariant
 */
function processTypeWithCheckValues(
  baseTypeName: string,
  checkValues?: ConstraintValue[],
): string {
  if (checkValues != null && checkValues.length > 0) {
    return generatePolyvariant(checkValues);
  }
  return baseTypeName;
}

/**
 * Converts a name to ReScript naming convention (camelCase starting with lowercase)
 */
function toRescriptName(name: string): string {
  if (name == null || name.length === 0) {
    return name;
  }
  return `${name[0]?.toLowerCase() ?? ''}${name.slice(1)}`;
}

/**
 * Handles ReScript reserved words by adding @as annotation
 */
function getFieldName(fieldName: string): string {
  if (reservedReScriptWords.includes(fieldName)) {
    return `@as("${fieldName}") ${fieldName}_`;
  }
  return fieldName;
}

/**
 * Escapes comments for ReScript
 */
function escapeComment(comment: string): string {
  return comment.replace(/\*\//g, '*\\/');
}

const reservedReScriptWords = [
  'and',
  'as',
  'assert',
  'await',
  'constraint',
  'else',
  'exception',
  'external',
  'false',
  'for',
  'if',
  'in',
  'include',
  'let',
  'module',
  'mutable',
  'of',
  'open',
  'private',
  'rec',
  'switch',
  'true',
  'try',
  'type',
  'when',
  'while',
];

type ParsedQuery =
  | {
      ast: TSQueryAST;
      mode: ProcessingMode.TS;
    }
  | {
      ast: SQLQueryAST;
      mode: ProcessingMode.SQL;
    };

export async function queryToTypeDeclarations(
  parsedQuery: ParsedQuery,
  typeSource: TypeSource,
  types: TypeAllocator,
  config: ParsedConfig,
): Promise<{
  result: string;
  inputParamTransforms: InputParamTransforms | null;
}> {
  let queryData;
  let queryName;
  if (parsedQuery.mode === ProcessingMode.TS) {
    queryName = pascalCase(parsedQuery.ast.name);
    queryData = processTSQueryAST(parsedQuery.ast);
  } else {
    queryName = pascalCase(parsedQuery.ast.name);
    queryData = processSQLQueryIR(queryASTToIR(parsedQuery.ast, null));
  }

  const typeData = await typeSource(queryData);
  const interfaceName = toRescriptName(pascalCase(queryName));

  const typeError = 'errorCode' in typeData;
  const hasAnonymousColumns =
    !typeError &&
    (typeData as IQueryTypes).returnTypes.some(
      ({ returnName }) => returnName === '?column?',
    );

  if (typeError || hasAnonymousColumns) {
    // tslint:disable:no-console
    if (typeError) {
      console.error(`Error in query "${queryName}". Details: %o`, typeData);
      if (config.failOnError) {
        throw new Error(
          `Query "${queryName}" is invalid. Can't generate types.`,
        );
      }
    } else {
      console.error(
        `Query '${queryName}' is invalid. Query contains an anonymous column. Consider giving the column an explicit name.`,
      );
    }
    let explanation = '';
    if (hasAnonymousColumns) {
      explanation = `Query contains an anonymous column. Consider giving the column an explicit name.`;
    }

    const returnInterface = generateTypeAlias(`${interfaceName}Result`, 'unit');
    const paramInterface = generateTypeAlias(`${interfaceName}Params`, 'unit');
    const resultErrorComment = `/** Query '${queryName}' is invalid, so its result is assigned type 'unit'.\n * ${explanation} */\n`;
    const paramErrorComment = `/** Query '${queryName}' is invalid, so its parameters are assigned type 'unit'.\n * ${explanation} */\n`;
    return {
      result: `${resultErrorComment}${returnInterface}${paramErrorComment}${paramInterface}`,
      inputParamTransforms: null,
    };
  }

  const { returnTypes, paramMetadata, inputTypes } = typeData;

  const returnFieldTypes: IField[] = [];
  const paramFieldTypes: IField[] = [];
  const records: string[] = [];

  // Generate input type records
  const inputTypeNames: Record<number, string> = {};
  const inputParamTransforms: InputParamTransforms = {};
  for (const [_, inputTypeInfo] of Object.entries(inputTypes || {})) {
    const recordTypeName = `${interfaceName}_${inputTypeInfo.tableName}InputType`;
    inputTypeNames[inputTypeInfo.assignedIndex] = recordTypeName;
    if (inputTypeInfo.stringify) {
      inputParamTransforms[inputTypeInfo.assignedIndex] = {
        type: 'stringify',
      };
    }

    const inputFieldTypes: IField[] = [];

    for (const field of inputTypeInfo.fields) {
      const baseTypeName = types.use(field.type, TypeScope.Parameter);
      const tsTypeName = processTypeWithCheckValues(
        baseTypeName,
        field.checkValues,
      );

      inputFieldTypes.push({
        fieldName: config.camelCaseColumnNames
          ? camelCase(field.columnName)
          : field.columnName,
        fieldType: tsTypeName,
        optional: field.optional,
        comment: field.comment,
      });
    }

    const inputRecord = generateInterface(recordTypeName, inputFieldTypes);
    records.push(inputRecord);
  }

  returnTypes.forEach(
    ({ returnName, type, nullable, comment, checkValues }) => {
      const baseTypeName = types.use(type, TypeScope.Return);
      let tsTypeName = processTypeWithCheckValues(baseTypeName, checkValues);

      const lastCharacter = returnName[returnName.length - 1]; // Checking for type hints
      const addNullability = lastCharacter === '?';
      const removeNullability = lastCharacter === '!';
      const shouldWrapInOption =
        (addNullability || nullable || nullable == null) && !removeNullability;

      tsTypeName = wrapInOption(tsTypeName, shouldWrapInOption);

      if (addNullability || removeNullability) {
        returnName = returnName.slice(0, -1);
      }

      returnFieldTypes.push({
        fieldName: config.camelCaseColumnNames
          ? camelCase(returnName)
          : returnName,
        fieldType: tsTypeName,
        comment,
      });
    },
  );

  const { params } = paramMetadata;
  for (const param of paramMetadata.mapping) {
    if (param.type === 'inputTypeReference') {
      const inputTypeInfo = inputTypes?.[param.assignedIndex];
      if (inputTypeInfo) {
        const recordTypeName = inputTypeNames[param.assignedIndex];
        if (recordTypeName) {
          paramFieldTypes.push({
            fieldName: param.name,
            fieldType: wrapInArray(recordTypeName, inputTypeInfo.multi),
          });
          continue;
        }
      }
      // Fallback if input type info is not available
      paramFieldTypes.push({
        fieldName: param.name,
        fieldType: 'unknown',
      });
    } else if (
      param.type === ParameterTransform.Scalar ||
      param.type === ParameterTransform.Spread
    ) {
      const isArray = param.type === ParameterTransform.Spread;

      const assignedIndex =
        param.assignedIndex instanceof Array
          ? param.assignedIndex[0]
          : param.assignedIndex;
      const pgTypeName = params[assignedIndex - 1];
      let tsTypeName = types.use(pgTypeName, TypeScope.Parameter);

      if (!param.required) {
        tsTypeName = tsTypeName;
      }

      // Allow optional scalar parameters to be missing from parameters object
      const optional =
        param.type === ParameterTransform.Scalar && !param.required;

      tsTypeName = wrapInArray(tsTypeName, isArray);

      // Make sure any JSON.t or array of JSON is stringified, since Postgres otherwise might
      // treat it as a Postgres array.
      if (tsTypeName === 'JSON.t' || tsTypeName === 'array<JSON.t>') {
        inputParamTransforms[param.assignedIndex.toString()] = {
          type: 'stringify',
        };
      }

      paramFieldTypes.push({
        optional,
        fieldName: param.name,
        fieldType: tsTypeName,
      });
    } else {
      const isArray = param.type === ParameterTransform.PickSpread;
      const recordFields = Object.values(param.dict).map((p) => ({
        name: p.name,
        type: types.use(params[p.assignedIndex - 1], TypeScope.Parameter),
        required: p.required,
      }));

      let fieldType = generateRecordType(recordFields);
      const name = `${interfaceName}Params_${param.name}`;
      records.push(`@gentype\ntype ${name} = ${fieldType}`);
      fieldType = name;
      fieldType = wrapInArray(fieldType, isArray);

      paramFieldTypes.push({
        fieldName: param.name,
        fieldType,
      });
    }
  }

  // TypeAllocator errors are currently considered non-fatal since a `never`
  // type is emitted which can be caught later when compiling the generated
  // code
  // tslint:disable-next-line:no-console
  types.errors.forEach((err) => console.log(err));

  const resultInterfaceName = `${interfaceName}Result`;
  const returnTypesInterface =
    `/** '${queryName}' return type */\n` +
    (returnFieldTypes.length > 0
      ? generateInterface(`${interfaceName}Result`, returnFieldTypes)
      : generateTypeAlias(resultInterfaceName, 'unit'));

  const paramInterfaceName = `${interfaceName}Params`;
  const paramTypesInterface =
    `${records.join('\n')}\n/** '${queryName}' parameters type */\n` +
    (paramFieldTypes.length > 0
      ? generateInterface(`${interfaceName}Params`, paramFieldTypes)
      : generateTypeAlias(paramInterfaceName, 'unit'));

  const typePairInterface =
    `/** '${queryName}' query type */\n` +
    generateInterface(`${interfaceName}Query`, [
      { fieldName: 'params', fieldType: paramInterfaceName },
      { fieldName: 'result', fieldType: resultInterfaceName },
    ]);

  return {
    result: [paramTypesInterface, returnTypesInterface, typePairInterface].join(
      '',
    ),
    inputParamTransforms:
      Object.keys(inputParamTransforms).length > 0
        ? inputParamTransforms
        : null,
  };
}

type ITypedQuery =
  | {
      mode: 'ts';
      fileName: string;
      query: {
        name: string;
        ast: TSQueryAST;
      };
      typeDeclaration: string;
    }
  | {
      mode: 'sql';
      fileName: string;
      query: {
        name: string;
        ast: SQLQueryAST;
        ir: SQLQueryIR;
        paramTypeAlias: string;
        returnTypeAlias: string;
      };
      typeDeclaration: string;
    };

async function generateTypedecsFromFile(
  contents: string,
  fileName: string,
  connection: any,
  mode: 'res' | 'sql',
  types: TypeAllocator,
  config: ParsedConfig,
): Promise<ITypedQuery[]> {
  const results: ITypedQuery[] = [];
  const interfacePrefix = '';
  const typeSource: TypeSource = (query) => getTypes(query, connection);

  const { queries, events } =
    mode === 'res'
      ? parseRescriptFile(contents, fileName)
      : parseSQLFile(contents);
  if (events.length > 0) {
    prettyPrintEvents(contents, events);
    if (events.find((e) => 'critical' in e)) {
      return results;
    }
  }
  for (const queryAST of queries) {
    let typedQuery: ITypedQuery;

    const sqlQueryAST = queryAST as SQLQueryAST;
    const { result, inputParamTransforms } = await queryToTypeDeclarations(
      { ast: sqlQueryAST, mode: ProcessingMode.SQL },
      typeSource,
      types,
      config,
    );
    const ir = queryASTToIR(sqlQueryAST, inputParamTransforms);
    typedQuery = {
      mode: 'sql' as const,
      query: {
        name: camelCase(sqlQueryAST.name),
        ast: sqlQueryAST,
        ir,
        paramTypeAlias: toRescriptName(
          `${interfacePrefix}${pascalCase(sqlQueryAST.name)}Params`,
        ),
        returnTypeAlias: toRescriptName(
          `${interfacePrefix}${pascalCase(sqlQueryAST.name)}Result`,
        ),
      },
      fileName,
      typeDeclaration: result,
    };
    results.push(typedQuery);
  }
  return results;
}

export async function generateDeclarationFile(
  contents: string,
  fileName: string,
  connection: any,
  mode: 'res' | 'sql',
  config: ParsedConfig,
  decsFileName: string,
): Promise<{ typeDecs: ITypedQuery[]; declarationFileContents: string }> {
  const types = new TypeAllocator(TypeMapping(config.typesOverrides));

  if (mode === 'sql') {
    // Second parameter has no effect here, we could have used any value
    types.use(
      { name: 'PreparedQuery', from: 'pgtyped-rescript-runtime' },
      TypeScope.Return,
    );
  }
  const typeDecs = await generateTypedecsFromFile(
    contents,
    fileName,
    connection,
    mode,
    types,
    config,
  );

  // file paths in generated files must be stable across platforms
  // https://github.com/adelsz/pgtyped/issues/230
  const isWindowsPath = path.sep === '\\';
  // always emit POSIX paths
  const stableFilePath = isWindowsPath
    ? fileName.replace(/\\/g, '/')
    : fileName;

  let declarationFileContents = '';
  declarationFileContents += `/** Types generated for queries found in "${stableFilePath}" */\n`;
  declarationFileContents += types.declaration(decsFileName);
  declarationFileContents += '\n';
  for (const typeDec of typeDecs) {
    declarationFileContents += typeDec.typeDeclaration;
    if (typeDec.mode === 'ts') {
      continue;
    }
    declarationFileContents += `%%private(let ${
      typeDec.query.name
    }IR: IR.t = %raw(\`${JSON.stringify(typeDec.query.ir)}\`))\n\n`;
    declarationFileContents +=
      `/**\n` +
      ` Runnable query:\n` +
      ` \`\`\`sql\n` +
      `${processSQLQueryIR(typeDec.query.ir).query}\n` +
      ` \`\`\`\n\n` +
      ` */\n`;
    declarationFileContents += `@gentype
module ${
      typeDec.query.name.slice(0, 1).toUpperCase() + typeDec.query.name.slice(1)
    }: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, ${
    typeDec.query.name
  }Params) => promise<array<${typeDec.query.name}Result>>
  /** Returns exactly 1 result. Returns \`None\` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, ${
    typeDec.query.name
  }Params) => promise<option<${typeDec.query.name}Result>>
  
  /** Returns exactly 1 result. Raises \`Exn.t\` (with an optionally provided \`errorMessage\`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    ${typeDec.query.name}Params,
    ~errorMessage: string=?
  ) => promise<${typeDec.query.name}Result>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, ${
    typeDec.query.name
  }Params) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external ${
    typeDec.query.name
  }: IR.t => PreparedStatement.t<${typeDec.query.paramTypeAlias}, ${
      typeDec.query.returnTypeAlias
    }> = "PreparedQuery";
  let query = ${typeDec.query.name}(${typeDec.query.name}IR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}


`;
  }
  return { declarationFileContents, typeDecs };
}
