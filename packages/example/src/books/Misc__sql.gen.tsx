/* TypeScript file generated from Misc__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const Misc__sqlJS = require('./Misc__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

/** 'Literals' parameters type */
export type literalsParams = void;

/** 'Literals' return type */
export type literalsResult = { readonly integer_literal: (undefined | number); readonly literal: (undefined | string) };

/** 'Literals' query type */
export type literalsQuery = { readonly params: literalsParams; readonly result: literalsResult };

/** Returns an array of all matched results. */
export const Literals_many: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<literalsResult[]> = Misc__sqlJS.Literals.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Literals_one: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<(undefined | literalsResult)> = Misc__sqlJS.Literals.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Literals_expectOne: (_1:PgTyped_Pg_Client_t, _2:literalsParams, errorMessage:(undefined | string)) => Promise<literalsResult> = Misc__sqlJS.Literals.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Literals_execute: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<void> = Misc__sqlJS.Literals.execute as any;

export const literals: (params:literalsParams, client:PgTyped_Pg_Client_t) => Promise<literalsResult[]> = Misc__sqlJS.literals as any;

export const Literals: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:literalsParams, errorMessage:(undefined | string)) => Promise<literalsResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<(undefined | literalsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<literalsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<void>
} = Misc__sqlJS.Literals as any;
