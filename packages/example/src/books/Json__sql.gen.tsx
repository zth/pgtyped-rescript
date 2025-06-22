/* TypeScript file generated from Json__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const Json__sqlJS = require('./Json__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

export type category = "novel" | "science-fiction" | "thriller";

export type categoryArray = category[];

/** 'Json' parameters type */
export type jsonParams = void;

/** 'Json' return type */
export type jsonResult = { readonly json_object: (undefined | JSON_t) };

/** 'Json' query type */
export type jsonQuery = { readonly params: jsonParams; readonly result: jsonResult };

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
export type jsonPopulateRecordsetJsonCastParams = { readonly books: JSON_t };

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

/** Returns an array of all matched results. */
export const Json_many: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<jsonResult[]> = Json__sqlJS.Json.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Json_one: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<(undefined | jsonResult)> = Json__sqlJS.Json.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Json_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonParams, errorMessage:(undefined | string)) => Promise<jsonResult> = Json__sqlJS.Json.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Json_execute: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<void> = Json__sqlJS.Json.execute as any;

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
