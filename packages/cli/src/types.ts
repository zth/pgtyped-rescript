// Default types
import {
  isAlias,
  isEnum,
  isEnumArray,
  isImport,
  MappableType,
  Type,
  ImportedType,
} from 'pgtyped-rescript-query';
import os from 'os';
import path from 'path';

const String: Type = { name: 'string' };
const Int: Type = { name: 'int' };
const Float: Type = { name: 'float' };
const NumberOrString: Type = { name: 'numberOrString' };
const Boolean: Type = { name: 'bool' };
const Date: Type = { name: 'Date.t' };
const DateOrString: Type = { name: 'dateOrString' };
const Bytes: Type = { name: 'Buffer.t' };
const Void: Type = { name: 'unit' };
const Json: Type = { name: 'JSON.t' };
const BigInt: Type = { name: 'bigint' };
const getArray = (baseType: Type): Type => {
  const definition = `array<${baseType.definition ?? baseType.name}>`;

  if (baseType.name.includes('.')) {
    // Module path in ReScript
    const splitName = baseType.name.split('.');
    const name = `array${splitName.join('_')}`;
    return {
      name,
      definition,
    };
  } else {
    return {
      name: `${baseType.name}Array`,
      definition: `array<${baseType.definition ?? baseType.name}>`,
    };
  }
};

export const DefaultTypeMapping = Object.freeze({
  // Integer types
  int2: { parameter: Int, return: Int },
  int4: { parameter: Int, return: Int },
  int8: { parameter: NumberOrString, return: String },
  smallint: { parameter: Int, return: Int },
  int: { parameter: Int, return: Int },
  bigint: { parameter: BigInt, return: BigInt },

  // Precision types
  real: { parameter: Float, return: Float },
  float4: { parameter: Float, return: Float },
  float: { parameter: Float, return: Float },
  float8: { parameter: Float, return: Float },
  numeric: { parameter: NumberOrString, return: String },
  decimal: { parameter: NumberOrString, return: String },

  // Serial types
  smallserial: { parameter: Int, return: Int },
  serial: { parameter: Int, return: Int },
  bigserial: { parameter: BigInt, return: BigInt },

  // Common string types
  uuid: { parameter: String, return: String },
  text: { parameter: String, return: String },
  varchar: { parameter: String, return: String },
  char: { parameter: String, return: String },
  bpchar: { parameter: String, return: String },
  citext: { parameter: String, return: String },
  name: { parameter: String, return: String },

  // Bool types
  bit: { parameter: Boolean, return: Boolean }, // TODO: { parameter: better, return: better } bit array support
  bool: { parameter: Boolean, return: Boolean },
  boolean: { parameter: Boolean, return: Boolean },

  // Dates and times
  date: { parameter: DateOrString, return: Date },
  timestamp: { parameter: DateOrString, return: Date },
  timestamptz: { parameter: DateOrString, return: Date },
  time: { parameter: DateOrString, return: Date },
  timetz: { parameter: DateOrString, return: Date },
  interval: { parameter: DateOrString, return: String },

  // Network address types
  inet: { parameter: String, return: String },
  cidr: { parameter: String, return: String },
  macaddr: { parameter: String, return: String },
  macaddr8: { parameter: String, return: String },

  // Extra types
  money: { parameter: String, return: String },
  tsvector: { parameter: String, return: String },
  void: { parameter: Void, return: Void },

  // JSON types
  json: { parameter: Json, return: Json },
  jsonb: { parameter: Json, return: Json },

  // Bytes
  bytea: { parameter: Bytes, return: Bytes },

  // Postgis types
  point: { parameter: getArray(Float), return: getArray(Float) },
});

export type BuiltinTypes = keyof typeof DefaultTypeMapping;

export type TypeDefinition = { parameter: Type; return: Type };

export type TypeMapping = Record<BuiltinTypes, TypeDefinition> &
  Record<string, TypeDefinition>;

export function TypeMapping(
  overrides: Record<string, Partial<TypeDefinition>> = {},
): TypeMapping {
  const output = { ...overrides };

  for (const typeName of Object.keys(DefaultTypeMapping)) {
    output[typeName] = {
      parameter:
        overrides[typeName]?.parameter ??
        DefaultTypeMapping[typeName as BuiltinTypes].parameter,
      return:
        overrides[typeName]?.return ??
        DefaultTypeMapping[typeName as BuiltinTypes].return,
    };
  }

  return output as TypeMapping;
}

export function declareImport(
  imports: ImportedType[],
  decsFileName: string,
): string {
  // name => alias
  const names = new Map<string, string>();
  let defaultImportAlias: string | null = null;

  for (const imp of imports) {
    if (imp.aliasOf === 'default') {
      defaultImportAlias ??= imp.name;

      if (imp.name !== defaultImportAlias) {
        throw new Error(
          `Default import from package "${imp.from}" is aliased differently multiple times (${imp.name} and ${defaultImportAlias})`,
        );
      }

      continue;
    }

    const namedImport = imp.aliasOf ?? imp.name;

    if (!names.has(namedImport)) {
      names.set(namedImport, imp.name);
    } else if (names.get(namedImport) !== imp.name) {
      throw new Error(
        `Import ${namedImport} from package "${
          imp.from
        }" is aliased differently multiple times (${imp.name} and ${names.get(
          namedImport,
        )})`,
      );
    }
  }

  let from = imports[0].from;

  if (from.startsWith('.')) {
    from = path.relative(path.dirname(decsFileName), imports[0].from);
    if (os.platform() === 'win32') {
      // make sure we use posix separators in TS import declarations (see #533)
      from = from.split(path.sep).join(path.posix.sep);
    }

    if (!from.startsWith('.')) {
      from = './' + from;
    }
  }

  const parts = ['import'];
  const subParts = [];

  if (defaultImportAlias) {
    subParts.push(defaultImportAlias);
  }

  if (names.size) {
    subParts.push(
      `{ ${[...names.entries()]
        .map(([name, alias]) => (name === alias ? name : `${name} as ${alias}`))
        .join(', ')} }`,
    );
  }

  parts.push(subParts.join(', '));
  parts.push(`from '${from}';\n`);

  return parts.join(' ');
}

function declareAlias(name: string, definition: string): string {
  return `@gentype\ntype ${name} = ${definition}\n`;
}

function declareStringUnion(name: string, values: string[]) {
  return declareAlias(
    name,
    `[${values
      .sort()
      .map((v) => `#"${v}"`)
      .join(' | ')}]`,
  );
}

export enum TypeScope {
  Parameter = 'parameter',
  Return = 'return',
}

/** Wraps a TypeMapping to track which types have been used, to accumulate errors,
 * and emit necessary type definitions. */
export class TypeAllocator {
  errors: Error[] = [];
  // from -> ImportedType[]
  imports: { [k: string]: ImportedType[] } = {};
  // name -> definition (if any)
  types: { [k: string]: Type } = {};

  constructor(
    private mapping: TypeMapping,
    private allowUnmappedTypes?: boolean,
  ) {}

  isMappedType(name: string): name is keyof TypeMapping {
    return name in this.mapping;
  }

  /** Lookup a database-provided type name in the allocator's map */
  use(typeNameOrType: MappableType, scope: TypeScope): string {
    let typ: Type | null = null;

    if (typeof typeNameOrType == 'string') {
      if (typeNameOrType[0] === '_') {
        // If starts with _ it is an PG Array type

        const arrayValueType = typeNameOrType.slice(1);
        // ^ Converts _varchar -> varchar, then wraps the type in an array

        const mappedType = this.use(arrayValueType, scope);
        typ = getArray({ name: mappedType });
      } else {
        if (!this.isMappedType(typeNameOrType)) {
          if (this.allowUnmappedTypes) {
            return typeNameOrType;
          }
          this.errors.push(
            new Error(
              `Postgres type '${typeNameOrType}' is not supported by mapping`,
            ),
          );
          return 'unknown';
        }
        typ = this.mapping[typeNameOrType][scope];
      }
    } else {
      if (isEnumArray(typeNameOrType)) {
        if (this.mapping[typeNameOrType.elementType.name]?.[scope]) {
          typ = getArray({
            name: typeNameOrType.elementType.name,
            definition:
              this.mapping[typeNameOrType.elementType.name][scope].name,
          });
        } else {
          typ = getArray(typeNameOrType.elementType);
        }
        // make sure the element type is used so it appears in the declaration
        this.use(typeNameOrType.elementType, scope);
      } else {
        typ = this.mapping[typeNameOrType.name]?.[scope] ?? typeNameOrType;
      }
    }

    // Track type on first occurrence
    this.types[typ.name] = this.types[typ.name] ?? typ;

    // Merge imports
    if (isImport(typ)) {
      this.imports[typ.from] = this.imports[typ.from] ?? [];
      this.imports[typ.from].push(typ);
    }

    return typ.name;
  }

  /** Emit a typescript definition for all types that have been used */
  declaration(_decsFileName: string): string {
    const imports = 'open PgTyped\n\n';

    // Declare database enums as string unions to maintain assignability of their values between query files
    const enums = Object.values(this.types)
      .filter(isEnum)
      .map((t) => declareStringUnion(t.name, t.enumValues))
      .sort()
      .join('\n');

    const aliases = Object.values(this.types)
      .filter(isAlias)
      .map((t) => declareAlias(t.name, t.definition))
      .sort()
      .join('\n');

    return [imports, enums, aliases].filter((s) => s).join('\n');
  }
}
