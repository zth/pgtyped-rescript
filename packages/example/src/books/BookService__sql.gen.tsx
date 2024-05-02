/* TypeScript file generated from BookService__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const BookService__sqlJS = require('./BookService__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

export type category = "novel" | "science-fiction" | "thriller";

export type notification_type = "deadline" | "notification" | "reminder";

export type arrayJSON_t = JSON_t[];

export type categoryArray = category[];

/** 'FindBookById' parameters type */
export type findBookByIdParams = { readonly id?: number };

/** 'FindBookById' return type */
export type findBookByIdResult = {
  readonly author_id: (undefined | number); 
  readonly big_int: (undefined | bigint); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly meta: (undefined | arrayJSON_t); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'FindBookById' query type */
export type findBookByIdQuery = { readonly params: findBookByIdParams; readonly result: findBookByIdResult };

/** 'Query1' parameters type */
export type query1Params = { readonly authorName: string };

/** 'Query1' return type */
export type query1Result = {
  readonly author_id: (undefined | number); 
  readonly big_int: (undefined | bigint); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly meta: (undefined | arrayJSON_t); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'Query1' query type */
export type query1Query = { readonly params: query1Params; readonly result: query1Result };

export type query2Params_notification = {
  readonly payload?: JSON_t; 
  readonly user_id?: number; 
  readonly type: (undefined | notification_type)
};

/** 'Query2' parameters type */
export type query2Params = { readonly notification: query2Params_notification };

/** 'Query2' return type */
export type query2Result = void;

/** 'Query2' query type */
export type query2Query = { readonly params: query2Params; readonly result: query2Result };

export type query3Params_notification = {
  readonly payload?: JSON_t; 
  readonly user_id?: number; 
  readonly type: (undefined | notification_type)
};

/** 'Query3' parameters type */
export type query3Params = { readonly notification: query3Params_notification };

/** 'Query3' return type */
export type query3Result = void;

/** 'Query3' query type */
export type query3Query = { readonly params: query3Params; readonly result: query3Result };

/** Returns an array of all matched results. */
export const FindBookById_many: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<findBookByIdResult[]> = BookService__sqlJS.FindBookById.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const FindBookById_one: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<(undefined | findBookByIdResult)> = BookService__sqlJS.FindBookById.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const FindBookById_expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: findBookByIdResult }
  | { TAG: "Error"; _0: string }> = BookService__sqlJS.FindBookById.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const FindBookById_execute: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<void> = BookService__sqlJS.FindBookById.execute as any;

export const findBookById: (params:findBookByIdParams, client:PgTyped_Pg_Client_t) => Promise<findBookByIdResult[]> = BookService__sqlJS.findBookById as any;

/** Returns an array of all matched results. */
export const Query1_many: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<query1Result[]> = BookService__sqlJS.Query1.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Query1_one: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<(undefined | query1Result)> = BookService__sqlJS.Query1.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Query1_expectOne: (_1:PgTyped_Pg_Client_t, _2:query1Params, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: query1Result }
  | { TAG: "Error"; _0: string }> = BookService__sqlJS.Query1.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Query1_execute: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<void> = BookService__sqlJS.Query1.execute as any;

export const query1: (params:query1Params, client:PgTyped_Pg_Client_t) => Promise<query1Result[]> = BookService__sqlJS.query1 as any;

/** Returns an array of all matched results. */
export const Query2_many: (_1:PgTyped_Pg_Client_t, _2:query2Params) => Promise<query2Result[]> = BookService__sqlJS.Query2.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Query2_one: (_1:PgTyped_Pg_Client_t, _2:query2Params) => Promise<(undefined | query2Result)> = BookService__sqlJS.Query2.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Query2_expectOne: (_1:PgTyped_Pg_Client_t, _2:query2Params, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: query2Result }
  | { TAG: "Error"; _0: string }> = BookService__sqlJS.Query2.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Query2_execute: (_1:PgTyped_Pg_Client_t, _2:query2Params) => Promise<void> = BookService__sqlJS.Query2.execute as any;

export const query2: (params:query2Params, client:PgTyped_Pg_Client_t) => Promise<query2Result[]> = BookService__sqlJS.query2 as any;

/** Returns an array of all matched results. */
export const Query3_many: (_1:PgTyped_Pg_Client_t, _2:query3Params) => Promise<query3Result[]> = BookService__sqlJS.Query3.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Query3_one: (_1:PgTyped_Pg_Client_t, _2:query3Params) => Promise<(undefined | query3Result)> = BookService__sqlJS.Query3.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Query3_expectOne: (_1:PgTyped_Pg_Client_t, _2:query3Params, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: query3Result }
  | { TAG: "Error"; _0: string }> = BookService__sqlJS.Query3.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Query3_execute: (_1:PgTyped_Pg_Client_t, _2:query3Params) => Promise<void> = BookService__sqlJS.Query3.execute as any;

export const query3: (params:query3Params, client:PgTyped_Pg_Client_t) => Promise<query3Result[]> = BookService__sqlJS.query3 as any;

export const FindBookById: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: findBookByIdResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<(undefined | findBookByIdResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<findBookByIdResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<void>
} = BookService__sqlJS.FindBookById as any;

export const Query1: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:query1Params, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: query1Result
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<(undefined | query1Result)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<query1Result[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:query1Params) => Promise<void>
} = BookService__sqlJS.Query1 as any;

export const Query2: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:query2Params, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: query2Result
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:query2Params) => Promise<(undefined | query2Result)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:query2Params) => Promise<query2Result[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:query2Params) => Promise<void>
} = BookService__sqlJS.Query2 as any;

export const Query3: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:query3Params, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: query3Result
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:query3Params) => Promise<(undefined | query3Result)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:query3Params) => Promise<query3Result[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:query3Params) => Promise<void>
} = BookService__sqlJS.Query3 as any;
