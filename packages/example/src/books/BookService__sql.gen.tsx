/* TypeScript file generated from BookService__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const BookService__sqlJS = require('./BookService__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

export type category = "novel" | "science-fiction" | "thriller";

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

/** 'BooksByAuthor' parameters type */
export type booksByAuthorParams = { readonly authorName: string };

/** 'BooksByAuthor' return type */
export type booksByAuthorResult = {
  readonly author_id: (undefined | number); 
  readonly big_int: (undefined | bigint); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly meta: (undefined | arrayJSON_t); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'BooksByAuthor' query type */
export type booksByAuthorQuery = { readonly params: booksByAuthorParams; readonly result: booksByAuthorResult };

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
export const BooksByAuthor_many: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams) => Promise<booksByAuthorResult[]> = BookService__sqlJS.BooksByAuthor.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const BooksByAuthor_one: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams) => Promise<(undefined | booksByAuthorResult)> = BookService__sqlJS.BooksByAuthor.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const BooksByAuthor_expectOne: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: booksByAuthorResult }
  | { TAG: "Error"; _0: string }> = BookService__sqlJS.BooksByAuthor.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const BooksByAuthor_execute: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams) => Promise<void> = BookService__sqlJS.BooksByAuthor.execute as any;

export const booksByAuthor: (params:booksByAuthorParams, client:PgTyped_Pg_Client_t) => Promise<booksByAuthorResult[]> = BookService__sqlJS.booksByAuthor as any;

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

export const BooksByAuthor: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: booksByAuthorResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams) => Promise<(undefined | booksByAuthorResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams) => Promise<booksByAuthorResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:booksByAuthorParams) => Promise<void>
} = BookService__sqlJS.BooksByAuthor as any;
