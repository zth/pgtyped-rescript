import { InterpolatedQuery } from 'pgtyped-rescript-runtime';
import { IParseError, IQueryTypes } from './actions.js';

export { getTypes, startup, IParseError, IQueryTypes } from './actions.js';

export {
  isAlias,
  isEnum,
  isEnumArray,
  isImport,
  MappableType,
  Type,
  ImportedType,
} from './type.js';

export type TypeSource = (
  queryData: InterpolatedQuery,
) => Promise<IQueryTypes | IParseError>;
