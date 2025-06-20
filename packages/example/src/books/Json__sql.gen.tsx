/* TypeScript file generated from Json__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const Json__sqlJS = require('./Json__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

/** 'Json' parameters type */
export type jsonParams = void;

/** 'Json' return type */
export type jsonResult = { readonly json_object: (undefined | JSON_t) };

/** 'Json' query type */
export type jsonQuery = { readonly params: jsonParams; readonly result: jsonResult };

/** Returns an array of all matched results. */
export const Json_many: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<jsonResult[]> = Json__sqlJS.Json.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Json_one: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<(undefined | jsonResult)> = Json__sqlJS.Json.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Json_expectOne: (_1:PgTyped_Pg_Client_t, _2:jsonParams, errorMessage:(undefined | string)) => Promise<jsonResult> = Json__sqlJS.Json.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Json_execute: (_1:PgTyped_Pg_Client_t, _2:jsonParams) => Promise<void> = Json__sqlJS.Json.execute as any;

export const json: (params:jsonParams, client:PgTyped_Pg_Client_t) => Promise<jsonResult[]> = Json__sqlJS.json as any;

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
