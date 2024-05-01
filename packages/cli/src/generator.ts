import {
  ParameterTransform,
  processSQLQueryIR,
  processTSQueryAST,
} from '@pgtyped/runtime';

import {
  parseSQLFile,
  prettyPrintEvents,
  queryASTToIR,
  SQLQueryAST,
  SQLQueryIR,
  TSQueryAST,
} from '@pgtyped/parser';

import { getTypes, TypeSource } from 'pgtyped-rescript-query';
import { camelCase } from 'camel-case';
import { pascalCase } from 'pascal-case';
import path from 'path';
import { ParsedConfig } from './config.js';
import { TypeAllocator, TypeMapping, TypeScope } from './types.js';
import { parseCode as parseRescriptFile } from './parseRescript.js';
import { IQueryTypes } from 'pgtyped-rescript-query/lib/actions';

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

const interfaceGen = (interfaceName: string, contents: string) =>
  `@gentype\ntype ${interfaceName} = {
${contents}
}\n\n`;

export function escapeComment(comment: string) {
  return comment.replace(/\*\//g, '*\\/');
}

export const generateInterface = (interfaceName: string, fields: IField[]) => {
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
  return interfaceGen(interfaceName, contents);
};

export const generateTypeAlias = (typeName: string, alias: string) =>
  `@gentype\ntype ${typeName} = ${alias}\n\n`;

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
): Promise<string> {
  let queryData;
  let queryName;
  if (parsedQuery.mode === ProcessingMode.TS) {
    queryName = pascalCase(parsedQuery.ast.name);
    queryData = processTSQueryAST(parsedQuery.ast);
  } else {
    queryName = pascalCase(parsedQuery.ast.name);
    queryData = processSQLQueryIR(queryASTToIR(parsedQuery.ast));
  }

  const typeData = await typeSource(queryData);
  const interfaceName = toRescriptName(pascalCase(queryName));
  const interfacePrefix = '';

  const typeError = 'errorCode' in typeData;
  const hasAnonymousColumns =
    !typeError &&
    (typeData as IQueryTypes).returnTypes.some(
      ({ returnName }) => returnName === '?column?',
    );

  if (typeError || hasAnonymousColumns) {
    // tslint:disable:no-console
    if (typeError) {
      console.error('Error in query. Details: %o', typeData);
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

    const returnInterface = generateTypeAlias(
      `${interfacePrefix}${interfaceName}Result`,
      'unit',
    );
    const paramInterface = generateTypeAlias(
      `${interfacePrefix}${interfaceName}Params`,
      'unit',
    );
    const resultErrorComment = `/** Query '${queryName}' is invalid, so its result is assigned type 'unit'.\n * ${explanation} */\n`;
    const paramErrorComment = `/** Query '${queryName}' is invalid, so its parameters are assigned type 'unit'.\n * ${explanation} */\n`;
    return `${resultErrorComment}${returnInterface}${paramErrorComment}${paramInterface}`;
  }

  const { returnTypes, paramMetadata } = typeData;

  const returnFieldTypes: IField[] = [];
  const paramFieldTypes: IField[] = [];
  const records: string[] = [];

  returnTypes.forEach(({ returnName, type, nullable, comment }) => {
    let tsTypeName = types.use(type, TypeScope.Return);

    const lastCharacter = returnName[returnName.length - 1]; // Checking for type hints
    const addNullability = lastCharacter === '?';
    const removeNullability = lastCharacter === '!';
    if (
      (addNullability || nullable || nullable == null) &&
      !removeNullability
    ) {
      tsTypeName = 'option<' + tsTypeName + '>';
    }

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
  });

  const { params } = paramMetadata;
  for (const param of paramMetadata.mapping) {
    if (
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

      paramFieldTypes.push({
        optional,
        fieldName: param.name,
        fieldType: isArray ? `array<${tsTypeName}>` : tsTypeName,
      });
    } else {
      const isArray = param.type === ParameterTransform.PickSpread;
      let fieldType = Object.values(param.dict)
        .map((p) => {
          const paramType = types.use(
            params[p.assignedIndex - 1],
            TypeScope.Parameter,
          );
          return p.required
            ? `  ${getFieldName(p.name)}: ${paramType}`
            : `  ${getFieldName(p.name)}?: ${paramType}`;
        })
        .join(',\n');
      fieldType = `{\n${fieldType}\n}\n`;
      const name = `${interfacePrefix}${interfaceName}Params_${param.name}`;
      records.push(`@gentype\ntype ${name} = ${fieldType}`);
      fieldType = name;
      if (isArray) {
        fieldType = `array<${fieldType}>`;
      }
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

  const resultInterfaceName = `${interfacePrefix}${interfaceName}Result`;
  const returnTypesInterface =
    `/** '${queryName}' return type */\n` +
    (returnFieldTypes.length > 0
      ? generateInterface(
          `${interfacePrefix}${interfaceName}Result`,
          returnFieldTypes,
        )
      : generateTypeAlias(resultInterfaceName, 'unit'));

  const paramInterfaceName = `${interfacePrefix}${interfaceName}Params`;
  const paramTypesInterface =
    `${records.join('\n')}/** '${queryName}' parameters type */\n` +
    (paramFieldTypes.length > 0
      ? generateInterface(
          `${interfacePrefix}${interfaceName}Params`,
          paramFieldTypes,
        )
      : generateTypeAlias(paramInterfaceName, 'unit'));

  const typePairInterface =
    `/** '${queryName}' query type */\n` +
    generateInterface(`${interfacePrefix}${interfaceName}Query`, [
      { fieldName: 'params', fieldType: paramInterfaceName },
      { fieldName: 'result', fieldType: resultInterfaceName },
    ]);

  return [paramTypesInterface, returnTypesInterface, typePairInterface].join(
    '',
  );
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
    mode === 'res' ? parseRescriptFile(contents) : parseSQLFile(contents);
  if (events.length > 0) {
    prettyPrintEvents(contents, events);
    if (events.find((e) => 'critical' in e)) {
      return results;
    }
  }
  for (const queryAST of queries) {
    let typedQuery: ITypedQuery;

    const sqlQueryAST = queryAST as SQLQueryAST;
    const result = await queryToTypeDeclarations(
      { ast: sqlQueryAST, mode: ProcessingMode.SQL },
      typeSource,
      types,
      config,
    );
    typedQuery = {
      mode: 'sql' as const,
      query: {
        name: camelCase(sqlQueryAST.name),
        ast: sqlQueryAST,
        ir: queryASTToIR(sqlQueryAST),
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
      { name: 'PreparedQuery', from: '@pgtyped/runtime' },
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
  
  /** Returns exactly 1 result. Returns \`Error\` (with an optionally provided \`errorMessage\`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    ${typeDec.query.name}Params,
    ~errorMessage: string=?
  ) => promise<result<${typeDec.query.name}Result, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, ${
    typeDec.query.name
  }Params) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external ${
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
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use '${
      typeDec.query.name.slice(0, 1).toUpperCase() + typeDec.query.name.slice(1)
    }.many' directly instead")
let ${typeDec.query.name} = (params, ~client) => ${
      typeDec.query.name.slice(0, 1).toUpperCase() + typeDec.query.name.slice(1)
    }.many(client, params)


`;
  }
  return { declarationFileContents, typeDecs };
}

function toRescriptName(name: string): string {
  if (name == null || name.length === 0) {
    return name;
  }

  return `${name[0]?.toLowerCase() ?? ''}${name.slice(1)}`;
}

const reservedReScriptWords = ['type'];

function getFieldName(fieldName: string): string {
  if (reservedReScriptWords.includes(fieldName)) {
    return `@as("${fieldName}") ${fieldName}_`;
  }

  return fieldName;
}
