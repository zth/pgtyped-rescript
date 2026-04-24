/* TypeScript file generated from Keywords__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const Keywords__sqlJS = require('./Keywords__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from './PgTyped.gen';

/** 'Keywords' parameters type */
export type keywordsParams = void;

/** 'Keywords' return type */
export type keywordsResult = {
  readonly assert: (undefined | string); 
  readonly await: (undefined | string); 
  readonly exception: (undefined | string); 
  readonly external: (undefined | string); 
  readonly id: number; 
  readonly if: (undefined | string); 
  readonly include: (undefined | string); 
  readonly let: (undefined | string); 
  readonly module: (undefined | string); 
  readonly mutable: (undefined | string); 
  readonly of: (undefined | string); 
  readonly open: (undefined | string); 
  readonly private: (undefined | string); 
  readonly rec: (undefined | string); 
  readonly switch: (undefined | string); 
  readonly try: (undefined | string); 
  readonly type: (undefined | string); 
  readonly while: (undefined | string)
};

/** 'Keywords' query type */
export type keywordsQuery = { readonly params: keywordsParams; readonly result: keywordsResult };

/** Returns an array of all matched results. */
export const Keywords_many: (_1:PgTyped_Pg_Client_t, _2:keywordsParams) => Promise<keywordsResult[]> = Keywords__sqlJS.Keywords.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Keywords_one: (_1:PgTyped_Pg_Client_t, _2:keywordsParams) => Promise<(undefined | keywordsResult)> = Keywords__sqlJS.Keywords.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Keywords_expectOne: (_1:PgTyped_Pg_Client_t, _2:keywordsParams, errorMessage:(undefined | string)) => Promise<keywordsResult> = Keywords__sqlJS.Keywords.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Keywords_execute: (_1:PgTyped_Pg_Client_t, _2:keywordsParams) => Promise<void> = Keywords__sqlJS.Keywords.execute as any;

export const Keywords: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:keywordsParams, errorMessage:(undefined | string)) => Promise<keywordsResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:keywordsParams) => Promise<(undefined | keywordsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:keywordsParams) => Promise<keywordsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:keywordsParams) => Promise<void>
} = Keywords__sqlJS.Keywords as any;
