/* TypeScript file generated from Json__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const Json__sqlJS = require('./Json__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from './PgTyped.gen';

export type category = "novel" | "science-fiction" | "thriller";

export type arrayJSON_t = unknown[];

export type categoryArray = category[];

/** 'Json' parameters type */
export type jsonParams = void;

/** 'Json' return type */
export type jsonResult = { readonly json_object: (undefined | unknown) };

/** 'Json' query type */
export type jsonQuery = { readonly params: jsonParams; readonly result: jsonResult };

/** 'JsonExtract' parameters type */
export type jsonExtractParams = { readonly jsonData: unknown };

/** 'JsonExtract' return type */
export type jsonExtractResult = { readonly user_id: (undefined | string); readonly user_name: (undefined | string) };

/** 'JsonExtract' query type */
export type jsonExtractQuery = { readonly params: jsonExtractParams; readonly result: jsonExtractResult };

/** 'JsonUnnestCast' parameters type */
export type jsonUnnestCastParams = { readonly jsonData: arrayJSON_t };

/** 'JsonUnnestCast' return type */
export type jsonUnnestCastResult = { readonly json_arr: (undefined | unknown) };

/** 'JsonUnnestCast' query type */
export type jsonUnnestCastQuery = { readonly params: jsonUnnestCastParams; readonly result: jsonUnnestCastResult };

export type jsonPopulateRecord_booksInputType = {
  readonly author_id?: number; 
  readonly categories?: categoryArray; 
  readonly id?: number; 
  readonly name?: string; 
  readonly rank?: number
};

/** 'JsonPopulateRecord' parameters type */
export type jsonPopulateRecordParams = { readonly book: jsonPopulateRecord_booksInputType };

/** 'JsonPopulateRecord' return type */
export type jsonPopulateRecordResult = {
  readonly author_id: (undefined | number); 
  readonly categories: (undefined | categoryArray); 
  readonly id: (undefined | number); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'JsonPopulateRecord' query type */
export type jsonPopulateRecordQuery = { readonly params: jsonPopulateRecordParams; readonly result: jsonPopulateRecordResult };

export type jsonPopulateRecordset_booksInputType = {
  readonly author_id?: number; 
  readonly categories?: categoryArray; 
  readonly id?: number; 
  readonly name?: string; 
  readonly rank?: number
};

/** 'JsonPopulateRecordset' parameters type */
export type jsonPopulateRecordsetParams = { readonly books: jsonPopulateRecordset_booksInputType[] };

/** 'JsonPopulateRecordset' return type */
export type jsonPopulateRecordsetResult = {
  readonly author_id: (undefined | number); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'JsonPopulateRecordset' query type */
export type jsonPopulateRecordsetQuery = { readonly params: jsonPopulateRecordsetParams; readonly result: jsonPopulateRecordsetResult };

/** 'JsonPopulateRecordsetJsonCast' parameters type */
export type jsonPopulateRecordsetJsonCastParams = { readonly books: unknown };

/** 'JsonPopulateRecordsetJsonCast' return type */
export type jsonPopulateRecordsetJsonCastResult = {
  readonly author_id: (undefined | number); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'JsonPopulateRecordsetJsonCast' query type */
export type jsonPopulateRecordsetJsonCastQuery = { readonly params: jsonPopulateRecordsetJsonCastParams; readonly result: jsonPopulateRecordsetJsonCastResult };

export type jsonbPopulateRecord_booksInputType = {
  readonly author_id?: number; 
  readonly categories?: categoryArray; 
  readonly id?: number; 
  readonly name?: string; 
  readonly rank?: number
};

/** 'JsonbPopulateRecord' parameters type */
export type jsonbPopulateRecordParams = { readonly book: jsonbPopulateRecord_booksInputType };

/** 'JsonbPopulateRecord' return type */
export type jsonbPopulateRecordResult = {
  readonly author_id: (undefined | number); 
  readonly categories: (undefined | categoryArray); 
  readonly id: (undefined | number); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'JsonbPopulateRecord' query type */
export type jsonbPopulateRecordQuery = { readonly params: jsonbPopulateRecordParams; readonly result: jsonbPopulateRecordResult };

export type jsonbPopulateRecordset_booksInputType = {
  readonly author_id?: number; 
  readonly categories?: categoryArray; 
  readonly id?: number; 
  readonly name?: string; 
  readonly rank?: number
};

/** 'JsonbPopulateRecordset' parameters type */
export type jsonbPopulateRecordsetParams = { readonly books: jsonbPopulateRecordset_booksInputType[] };

/** 'JsonbPopulateRecordset' return type */
export type jsonbPopulateRecordsetResult = {
  readonly author_id: (undefined | number); 
  readonly categories: (undefined | categoryArray); 
  readonly id: (undefined | number); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'JsonbPopulateRecordset' query type */
export type jsonbPopulateRecordsetQuery = { readonly params: jsonbPopulateRecordsetParams; readonly result: jsonbPopulateRecordsetResult };

/** Returns an array of all matched results. */
export const Json_many: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<jsonResult[]> = Json__sqlJS.Json.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Json_one: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<(undefined | jsonResult)> = Json__sqlJS.Json.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Json_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonParams, errorMessage:(undefined | string)) => Promise<jsonResult> = Json__sqlJS.Json.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Json_execute: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<void> = Json__sqlJS.Json.execute as any;

/** Returns an array of all matched results. */
export const JsonExtract_many: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams) => Promise<jsonExtractResult[]> = Json__sqlJS.JsonExtract.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const JsonExtract_one: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams) => Promise<(undefined | jsonExtractResult)> = Json__sqlJS.JsonExtract.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const JsonExtract_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams, errorMessage:(undefined | string)) => Promise<jsonExtractResult> = Json__sqlJS.JsonExtract.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const JsonExtract_execute: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams) => Promise<void> = Json__sqlJS.JsonExtract.execute as any;

/** Returns an array of all matched results. */
export const JsonUnnestCast_many: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams) => Promise<jsonUnnestCastResult[]> = Json__sqlJS.JsonUnnestCast.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const JsonUnnestCast_one: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams) => Promise<(undefined | jsonUnnestCastResult)> = Json__sqlJS.JsonUnnestCast.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const JsonUnnestCast_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams, errorMessage:(undefined | string)) => Promise<jsonUnnestCastResult> = Json__sqlJS.JsonUnnestCast.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const JsonUnnestCast_execute: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams) => Promise<void> = Json__sqlJS.JsonUnnestCast.execute as any;

/** Returns an array of all matched results. */
export const JsonPopulateRecord_many: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams) => Promise<jsonPopulateRecordResult[]> = Json__sqlJS.JsonPopulateRecord.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const JsonPopulateRecord_one: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams) => Promise<(undefined | jsonPopulateRecordResult)> = Json__sqlJS.JsonPopulateRecord.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const JsonPopulateRecord_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams, errorMessage:(undefined | string)) => Promise<jsonPopulateRecordResult> = Json__sqlJS.JsonPopulateRecord.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const JsonPopulateRecord_execute: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams) => Promise<void> = Json__sqlJS.JsonPopulateRecord.execute as any;

/** Returns an array of all matched results. */
export const JsonPopulateRecordset_many: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams) => Promise<jsonPopulateRecordsetResult[]> = Json__sqlJS.JsonPopulateRecordset.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const JsonPopulateRecordset_one: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams) => Promise<(undefined | jsonPopulateRecordsetResult)> = Json__sqlJS.JsonPopulateRecordset.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const JsonPopulateRecordset_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams, errorMessage:(undefined | string)) => Promise<jsonPopulateRecordsetResult> = Json__sqlJS.JsonPopulateRecordset.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const JsonPopulateRecordset_execute: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams) => Promise<void> = Json__sqlJS.JsonPopulateRecordset.execute as any;

/** Returns an array of all matched results. */
export const JsonPopulateRecordsetJsonCast_many: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams) => Promise<jsonPopulateRecordsetJsonCastResult[]> = Json__sqlJS.JsonPopulateRecordsetJsonCast.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const JsonPopulateRecordsetJsonCast_one: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams) => Promise<(undefined | jsonPopulateRecordsetJsonCastResult)> = Json__sqlJS.JsonPopulateRecordsetJsonCast.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const JsonPopulateRecordsetJsonCast_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams, errorMessage:(undefined | string)) => Promise<jsonPopulateRecordsetJsonCastResult> = Json__sqlJS.JsonPopulateRecordsetJsonCast.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const JsonPopulateRecordsetJsonCast_execute: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams) => Promise<void> = Json__sqlJS.JsonPopulateRecordsetJsonCast.execute as any;

/** Returns an array of all matched results. */
export const JsonbPopulateRecord_many: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams) => Promise<jsonbPopulateRecordResult[]> = Json__sqlJS.JsonbPopulateRecord.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const JsonbPopulateRecord_one: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams) => Promise<(undefined | jsonbPopulateRecordResult)> = Json__sqlJS.JsonbPopulateRecord.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const JsonbPopulateRecord_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams, errorMessage:(undefined | string)) => Promise<jsonbPopulateRecordResult> = Json__sqlJS.JsonbPopulateRecord.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const JsonbPopulateRecord_execute: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams) => Promise<void> = Json__sqlJS.JsonbPopulateRecord.execute as any;

/** Returns an array of all matched results. */
export const JsonbPopulateRecordset_many: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams) => Promise<jsonbPopulateRecordsetResult[]> = Json__sqlJS.JsonbPopulateRecordset.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const JsonbPopulateRecordset_one: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams) => Promise<(undefined | jsonbPopulateRecordsetResult)> = Json__sqlJS.JsonbPopulateRecordset.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const JsonbPopulateRecordset_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams, errorMessage:(undefined | string)) => Promise<jsonbPopulateRecordsetResult> = Json__sqlJS.JsonbPopulateRecordset.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const JsonbPopulateRecordset_execute: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams) => Promise<void> = Json__sqlJS.JsonbPopulateRecordset.execute as any;

export const JsonExtract: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams, errorMessage:(undefined | string)) => Promise<jsonExtractResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams) => Promise<(undefined | jsonExtractResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams) => Promise<jsonExtractResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonExtractParams) => Promise<void>
} = Json__sqlJS.JsonExtract as any;

export const JsonbPopulateRecord: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams, errorMessage:(undefined | string)) => Promise<jsonbPopulateRecordResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams) => Promise<(undefined | jsonbPopulateRecordResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams) => Promise<jsonbPopulateRecordResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordParams) => Promise<void>
} = Json__sqlJS.JsonbPopulateRecord as any;

export const JsonPopulateRecord: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams, errorMessage:(undefined | string)) => Promise<jsonPopulateRecordResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams) => Promise<(undefined | jsonPopulateRecordResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams) => Promise<jsonPopulateRecordResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordParams) => Promise<void>
} = Json__sqlJS.JsonPopulateRecord as any;

export const JsonPopulateRecordset: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams, errorMessage:(undefined | string)) => Promise<jsonPopulateRecordsetResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams) => Promise<(undefined | jsonPopulateRecordsetResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams) => Promise<jsonPopulateRecordsetResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetParams) => Promise<void>
} = Json__sqlJS.JsonPopulateRecordset as any;

export const JsonbPopulateRecordset: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams, errorMessage:(undefined | string)) => Promise<jsonbPopulateRecordsetResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams) => Promise<(undefined | jsonbPopulateRecordsetResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams) => Promise<jsonbPopulateRecordsetResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonbPopulateRecordsetParams) => Promise<void>
} = Json__sqlJS.JsonbPopulateRecordset as any;

export const Json: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonParams, errorMessage:(undefined | string)) => Promise<jsonResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<(undefined | jsonResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<jsonResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<void>
} = Json__sqlJS.Json as any;

export const JsonUnnestCast: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams, errorMessage:(undefined | string)) => Promise<jsonUnnestCastResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams) => Promise<(undefined | jsonUnnestCastResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams) => Promise<jsonUnnestCastResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonUnnestCastParams) => Promise<void>
} = Json__sqlJS.JsonUnnestCast as any;

export const JsonPopulateRecordsetJsonCast: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams, errorMessage:(undefined | string)) => Promise<jsonPopulateRecordsetJsonCastResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams) => Promise<(undefined | jsonPopulateRecordsetJsonCastResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams) => Promise<jsonPopulateRecordsetJsonCastResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:jsonPopulateRecordsetJsonCastParams) => Promise<void>
} = Json__sqlJS.JsonPopulateRecordsetJsonCast as any;
