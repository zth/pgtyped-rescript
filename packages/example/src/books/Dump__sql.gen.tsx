/* TypeScript file generated from Dump__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const Dump__sqlJS = require('./Dump__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

export type arrayJSON_t = JSON_t[];

/** 'Dump' parameters type */
export type dumpParams = void;

/** 'Dump' return type */
export type dumpResult = {
  readonly availability: (undefined | string); 
  readonly big_int: (undefined | bigint); 
  readonly binding_type: (undefined | (
    "SPIRAL"
  | "Hardcover"
  | "loose-leaf"
  | "Paperback")); 
  readonly discount_rate: (undefined | number); 
  readonly edition: (undefined | number); 
  readonly format: (undefined | (
    "hardcover"
  | "paperback"
  | "ebook"
  | "audiobook")); 
  readonly id: number; 
  readonly is_featured: (undefined | boolean); 
  readonly isbn: (undefined | string); 
  readonly json_test: (undefined | JSON_t); 
  readonly language: (undefined | (
    "en"
  | "de"
  | "fr"
  | "es")); 
  readonly meta: (undefined | arrayJSON_t); 
  readonly page_count: (undefined | (
    400
  | 100
  | 300
  | 500
  | 200)); 
  readonly price: (undefined | string); 
  readonly priority: (undefined | (
    5
  | 2
  | 1
  | 4
  | 3)); 
  readonly publication_year: (undefined | number); 
  readonly rating: (undefined | number); 
  readonly some_float_enum: (undefined | number); 
  readonly some_int_enum: (undefined | (
    2
  | 1
  | 4
  | 3)); 
  readonly some_string_enum: (undefined | (
    "Third"
  | "second"
  | "fourth"
  | "FIRST")); 
  readonly status: (undefined | (
    "draft"
  | "published"
  | "archived")); 
  readonly weight_kg: (undefined | number)
};

/** 'Dump' query type */
export type dumpQuery = { readonly params: dumpParams; readonly result: dumpResult };

/** Returns an array of all matched results. */
export const Dump_many: (_1:PgTyped_Pg_Client_t, _2:dumpParams) => Promise<dumpResult[]> = Dump__sqlJS.Dump.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Dump_one: (_1:PgTyped_Pg_Client_t, _2:dumpParams) => Promise<(undefined | dumpResult)> = Dump__sqlJS.Dump.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Dump_expectOne: (_1:PgTyped_Pg_Client_t, _2:dumpParams, errorMessage:(undefined | string)) => Promise<dumpResult> = Dump__sqlJS.Dump.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Dump_execute: (_1:PgTyped_Pg_Client_t, _2:dumpParams) => Promise<void> = Dump__sqlJS.Dump.execute as any;

export const Dump: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:dumpParams, errorMessage:(undefined | string)) => Promise<dumpResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:dumpParams) => Promise<(undefined | dumpResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:dumpParams) => Promise<dumpResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:dumpParams) => Promise<void>
} = Dump__sqlJS.Dump as any;
