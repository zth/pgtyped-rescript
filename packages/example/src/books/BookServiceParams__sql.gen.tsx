/* TypeScript file generated from BookServiceParams__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const BookServiceParams__sqlJS = require('./BookServiceParams__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

export type notification_type = "deadline" | "notification" | "reminder";

export type query1Params_notification = {
  readonly payload?: JSON_t; 
  readonly user_id?: number; 
  readonly type: (undefined | notification_type)
};

/** 'Query1' parameters type */
export type query1Params = { readonly notification: query1Params_notification };

/** 'Query1' return type */
export type query1Result = void;

/** 'Query1' query type */
export type query1Query = { readonly params: query1Params; readonly result: query1Result };

/** Returns an array of all matched results. */
export const Query1_many: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<query1Result[]> = BookServiceParams__sqlJS.Query1.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Query1_one: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<(undefined | query1Result)> = BookServiceParams__sqlJS.Query1.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Query1_expectOne: (_1:PgTyped_Pg_Client_t, _2:query1Params, errorMessage:(undefined | string)) => Promise<query1Result> = BookServiceParams__sqlJS.Query1.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Query1_execute: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<void> = BookServiceParams__sqlJS.Query1.execute as any;

export const Query1: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:query1Params, errorMessage:(undefined | string)) => Promise<query1Result>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<(undefined | query1Result)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<query1Result[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<void>
} = BookServiceParams__sqlJS.Query1 as any;
