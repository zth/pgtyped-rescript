/* TypeScript file generated from Misc__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const Misc__sqlJS = require('./Misc__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

/** 'Literals' parameters type */
export type literalsParams = void;

/** 'Literals' return type */
export type literalsResult = {
  readonly test_integer_literal: 
    1; 
  readonly test_regular_string: (undefined | string); 
  readonly test_string_literal: 
    "literal"
};

/** 'Literals' query type */
export type literalsQuery = { readonly params: literalsParams; readonly result: literalsResult };

/** 'MoreLiterals' parameters type */
export type moreLiteralsParams = void;

/** 'MoreLiterals' return type */
export type moreLiteralsResult = {
  readonly admin_role: 
    "admin"; 
  readonly error_status: 
    "error"; 
  readonly guest_role: 
    "guest"; 
  readonly magic_number: 
    42; 
  readonly max_percentage: 
    100; 
  readonly negative_one: (undefined | number); 
  readonly pending_status: 
    "pending"; 
  readonly status: 
    "success"; 
  readonly user_role: 
    "user"; 
  readonly zero_value: 
    0
};

/** 'MoreLiterals' query type */
export type moreLiteralsQuery = { readonly params: moreLiteralsParams; readonly result: moreLiteralsResult };

/** 'DuplicateAliasTest' parameters type */
export type duplicateAliasTestParams = void;

/** 'DuplicateAliasTest' return type */
export type duplicateAliasTestResult = {
  readonly priority: 
    1; 
  readonly status: 
    "main"; 
  readonly sub_status: (undefined | string)
};

/** 'DuplicateAliasTest' query type */
export type duplicateAliasTestQuery = { readonly params: duplicateAliasTestParams; readonly result: duplicateAliasTestResult };

/** 'UnionTest' parameters type */
export type unionTestParams = void;

/** 'UnionTest' return type */
export type unionTestResult = { readonly document_status: "draft" | "published"; readonly version: 2 | 1 };

/** 'UnionTest' query type */
export type unionTestQuery = { readonly params: unionTestParams; readonly result: unionTestResult };

/** 'UnionTestWithString' parameters type */
export type unionTestWithStringParams = void;

/** 'UnionTestWithString' return type */
export type unionTestWithStringResult = { readonly document_status: (undefined | string); readonly version: 2 | 1 | 3 };

/** 'UnionTestWithString' query type */
export type unionTestWithStringQuery = { readonly params: unionTestWithStringParams; readonly result: unionTestWithStringResult };

/** 'SingleLiterals' parameters type */
export type singleLiteralsParams = void;

/** 'SingleLiterals' return type */
export type singleLiteralsResult = {
  readonly booking_status: 
    "confirmed"; 
  readonly rating_stars: 
    5; 
  readonly subscription_tier: 
    "premium"
};

/** 'SingleLiterals' query type */
export type singleLiteralsQuery = { readonly params: singleLiteralsParams; readonly result: singleLiteralsResult };

/** 'EdgeCases' parameters type */
export type edgeCasesParams = void;

/** 'EdgeCases' return type */
export type edgeCasesResult = {
  readonly empty_string: 
    ""; 
  readonly large_number: 
    123456789; 
  readonly minus_one: (undefined | number); 
  readonly negative_number: (undefined | number); 
  readonly null_string: 
    "null"; 
  readonly single_char: 
    "a"; 
  readonly string_with_spaces: 
    "with spaces"; 
  readonly zero: 
    0
};

/** 'EdgeCases' query type */
export type edgeCasesQuery = { readonly params: edgeCasesParams; readonly result: edgeCasesResult };

/** 'ContextTest' parameters type */
export type contextTestParams = void;

/** 'ContextTest' return type */
export type contextTestResult = {
  readonly nested_count: (undefined | bigint); 
  readonly result_type: 
    "final_value"; 
  readonly status: 
    "outer_result"
};

/** 'ContextTest' query type */
export type contextTestQuery = { readonly params: contextTestParams; readonly result: contextTestResult };

/** Returns an array of all matched results. */
export const Literals_many: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<literalsResult[]> = Misc__sqlJS.Literals.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const Literals_one: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<(undefined | literalsResult)> = Misc__sqlJS.Literals.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const Literals_expectOne: (_1:PgTyped_Pg_Client_t, _2:literalsParams, errorMessage:(undefined | string)) => Promise<literalsResult> = Misc__sqlJS.Literals.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const Literals_execute: (_1:PgTyped_Pg_Client_t, _2:literalsParams) => Promise<void> = Misc__sqlJS.Literals.execute as any;

/** Returns an array of all matched results. */
export const MoreLiterals_many: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams) => Promise<moreLiteralsResult[]> = Misc__sqlJS.MoreLiterals.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const MoreLiterals_one: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams) => Promise<(undefined | moreLiteralsResult)> = Misc__sqlJS.MoreLiterals.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const MoreLiterals_expectOne: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams, errorMessage:(undefined | string)) => Promise<moreLiteralsResult> = Misc__sqlJS.MoreLiterals.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const MoreLiterals_execute: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams) => Promise<void> = Misc__sqlJS.MoreLiterals.execute as any;

/** Returns an array of all matched results. */
export const DuplicateAliasTest_many: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams) => Promise<duplicateAliasTestResult[]> = Misc__sqlJS.DuplicateAliasTest.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const DuplicateAliasTest_one: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams) => Promise<(undefined | duplicateAliasTestResult)> = Misc__sqlJS.DuplicateAliasTest.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const DuplicateAliasTest_expectOne: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams, errorMessage:(undefined | string)) => Promise<duplicateAliasTestResult> = Misc__sqlJS.DuplicateAliasTest.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const DuplicateAliasTest_execute: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams) => Promise<void> = Misc__sqlJS.DuplicateAliasTest.execute as any;

/** Returns an array of all matched results. */
export const UnionTest_many: (_1:PgTyped_Pg_Client_t, _2:unionTestParams) => Promise<unionTestResult[]> = Misc__sqlJS.UnionTest.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const UnionTest_one: (_1:PgTyped_Pg_Client_t, _2:unionTestParams) => Promise<(undefined | unionTestResult)> = Misc__sqlJS.UnionTest.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const UnionTest_expectOne: (_1:PgTyped_Pg_Client_t, _2:unionTestParams, errorMessage:(undefined | string)) => Promise<unionTestResult> = Misc__sqlJS.UnionTest.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const UnionTest_execute: (_1:PgTyped_Pg_Client_t, _2:unionTestParams) => Promise<void> = Misc__sqlJS.UnionTest.execute as any;

/** Returns an array of all matched results. */
export const UnionTestWithString_many: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams) => Promise<unionTestWithStringResult[]> = Misc__sqlJS.UnionTestWithString.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const UnionTestWithString_one: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams) => Promise<(undefined | unionTestWithStringResult)> = Misc__sqlJS.UnionTestWithString.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const UnionTestWithString_expectOne: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams, errorMessage:(undefined | string)) => Promise<unionTestWithStringResult> = Misc__sqlJS.UnionTestWithString.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const UnionTestWithString_execute: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams) => Promise<void> = Misc__sqlJS.UnionTestWithString.execute as any;

/** Returns an array of all matched results. */
export const SingleLiterals_many: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams) => Promise<singleLiteralsResult[]> = Misc__sqlJS.SingleLiterals.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const SingleLiterals_one: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams) => Promise<(undefined | singleLiteralsResult)> = Misc__sqlJS.SingleLiterals.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const SingleLiterals_expectOne: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams, errorMessage:(undefined | string)) => Promise<singleLiteralsResult> = Misc__sqlJS.SingleLiterals.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const SingleLiterals_execute: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams) => Promise<void> = Misc__sqlJS.SingleLiterals.execute as any;

/** Returns an array of all matched results. */
export const EdgeCases_many: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams) => Promise<edgeCasesResult[]> = Misc__sqlJS.EdgeCases.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const EdgeCases_one: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams) => Promise<(undefined | edgeCasesResult)> = Misc__sqlJS.EdgeCases.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const EdgeCases_expectOne: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams, errorMessage:(undefined | string)) => Promise<edgeCasesResult> = Misc__sqlJS.EdgeCases.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const EdgeCases_execute: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams) => Promise<void> = Misc__sqlJS.EdgeCases.execute as any;

/** Returns an array of all matched results. */
export const ContextTest_many: (_1:PgTyped_Pg_Client_t, _2:contextTestParams) => Promise<contextTestResult[]> = Misc__sqlJS.ContextTest.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const ContextTest_one: (_1:PgTyped_Pg_Client_t, _2:contextTestParams) => Promise<(undefined | contextTestResult)> = Misc__sqlJS.ContextTest.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const ContextTest_expectOne: (_1:PgTyped_Pg_Client_t, _2:contextTestParams, errorMessage:(undefined | string)) => Promise<contextTestResult> = Misc__sqlJS.ContextTest.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const ContextTest_execute: (_1:PgTyped_Pg_Client_t, _2:contextTestParams) => Promise<void> = Misc__sqlJS.ContextTest.execute as any;

export const MoreLiterals: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams, errorMessage:(undefined | string)) => Promise<moreLiteralsResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams) => Promise<(undefined | moreLiteralsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams) => Promise<moreLiteralsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:moreLiteralsParams) => Promise<void>
} = Misc__sqlJS.MoreLiterals as any;

export const UnionTest: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:unionTestParams, errorMessage:(undefined | string)) => Promise<unionTestResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:unionTestParams) => Promise<(undefined | unionTestResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:unionTestParams) => Promise<unionTestResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:unionTestParams) => Promise<void>
} = Misc__sqlJS.UnionTest as any;

export const EdgeCases: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams, errorMessage:(undefined | string)) => Promise<edgeCasesResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams) => Promise<(undefined | edgeCasesResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams) => Promise<edgeCasesResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:edgeCasesParams) => Promise<void>
} = Misc__sqlJS.EdgeCases as any;

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

export const DuplicateAliasTest: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams, errorMessage:(undefined | string)) => Promise<duplicateAliasTestResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams) => Promise<(undefined | duplicateAliasTestResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams) => Promise<duplicateAliasTestResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:duplicateAliasTestParams) => Promise<void>
} = Misc__sqlJS.DuplicateAliasTest as any;

export const SingleLiterals: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams, errorMessage:(undefined | string)) => Promise<singleLiteralsResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams) => Promise<(undefined | singleLiteralsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams) => Promise<singleLiteralsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:singleLiteralsParams) => Promise<void>
} = Misc__sqlJS.SingleLiterals as any;

export const UnionTestWithString: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams, errorMessage:(undefined | string)) => Promise<unionTestWithStringResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams) => Promise<(undefined | unionTestWithStringResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams) => Promise<unionTestWithStringResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:unionTestWithStringParams) => Promise<void>
} = Misc__sqlJS.UnionTestWithString as any;

export const ContextTest: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:contextTestParams, errorMessage:(undefined | string)) => Promise<contextTestResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:contextTestParams) => Promise<(undefined | contextTestResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:contextTestParams) => Promise<contextTestResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:contextTestParams) => Promise<void>
} = Misc__sqlJS.ContextTest as any;
