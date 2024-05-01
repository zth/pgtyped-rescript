/* TypeScript file generated from comments__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const comments__sqlJS = require('./comments__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

/** 'GetAllComments' parameters type */
export type getAllCommentsParams = { readonly id: number };

/** 'GetAllComments' return type */
export type getAllCommentsResult = {
  readonly body: (undefined | string); 
  readonly book_id: (undefined | number); 
  readonly id: number; 
  readonly user_id: (undefined | number)
};

/** 'GetAllComments' query type */
export type getAllCommentsQuery = { readonly params: getAllCommentsParams; readonly result: getAllCommentsResult };

/** 'GetAllCommentsByIds' parameters type */
export type getAllCommentsByIdsParams = { readonly ids: number[] };

/** 'GetAllCommentsByIds' return type */
export type getAllCommentsByIdsResult = {
  readonly body: (undefined | string); 
  readonly book_id: (undefined | number); 
  readonly id: number; 
  readonly user_id: (undefined | number)
};

/** 'GetAllCommentsByIds' query type */
export type getAllCommentsByIdsQuery = { readonly params: getAllCommentsByIdsParams; readonly result: getAllCommentsByIdsResult };

export type insertCommentParams_comments = { readonly userId: number; readonly commentBody: string };

/** 'InsertComment' parameters type */
export type insertCommentParams = { readonly comments: insertCommentParams_comments[] };

/** 'InsertComment' return type */
export type insertCommentResult = {
  readonly body: (undefined | string); 
  readonly book_id: (undefined | number); 
  readonly id: number; 
  readonly user_id: (undefined | number)
};

/** 'InsertComment' query type */
export type insertCommentQuery = { readonly params: insertCommentParams; readonly result: insertCommentResult };

/** 'SelectExistsTest' parameters type */
export type selectExistsTestParams = void;

/** 'SelectExistsTest' return type */
export type selectExistsTestResult = { readonly isTransactionExists: (undefined | boolean) };

/** 'SelectExistsTest' query type */
export type selectExistsTestQuery = { readonly params: selectExistsTestParams; readonly result: selectExistsTestResult };

/** Returns an array of all matched results. */
export const GetAllComments_many: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams) => Promise<getAllCommentsResult[]> = comments__sqlJS.GetAllComments.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const GetAllComments_one: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams) => Promise<(undefined | getAllCommentsResult)> = comments__sqlJS.GetAllComments.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const GetAllComments_expectOne: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: getAllCommentsResult }
  | { TAG: "Error"; _0: string }> = comments__sqlJS.GetAllComments.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const GetAllComments_execute: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams) => Promise<void> = comments__sqlJS.GetAllComments.execute as any;

export const getAllComments: (params:getAllCommentsParams, client:PgTyped_Pg_Client_t) => Promise<getAllCommentsResult[]> = comments__sqlJS.getAllComments as any;

/** Returns an array of all matched results. */
export const GetAllCommentsByIds_many: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams) => Promise<getAllCommentsByIdsResult[]> = comments__sqlJS.GetAllCommentsByIds.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const GetAllCommentsByIds_one: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams) => Promise<(undefined | getAllCommentsByIdsResult)> = comments__sqlJS.GetAllCommentsByIds.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const GetAllCommentsByIds_expectOne: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: getAllCommentsByIdsResult }
  | { TAG: "Error"; _0: string }> = comments__sqlJS.GetAllCommentsByIds.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const GetAllCommentsByIds_execute: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams) => Promise<void> = comments__sqlJS.GetAllCommentsByIds.execute as any;

export const getAllCommentsByIds: (params:getAllCommentsByIdsParams, client:PgTyped_Pg_Client_t) => Promise<getAllCommentsByIdsResult[]> = comments__sqlJS.getAllCommentsByIds as any;

/** Returns an array of all matched results. */
export const InsertComment_many: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams) => Promise<insertCommentResult[]> = comments__sqlJS.InsertComment.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const InsertComment_one: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams) => Promise<(undefined | insertCommentResult)> = comments__sqlJS.InsertComment.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const InsertComment_expectOne: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: insertCommentResult }
  | { TAG: "Error"; _0: string }> = comments__sqlJS.InsertComment.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const InsertComment_execute: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams) => Promise<void> = comments__sqlJS.InsertComment.execute as any;

export const insertComment: (params:insertCommentParams, client:PgTyped_Pg_Client_t) => Promise<insertCommentResult[]> = comments__sqlJS.insertComment as any;

/** Returns an array of all matched results. */
export const SelectExistsTest_many: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams) => Promise<selectExistsTestResult[]> = comments__sqlJS.SelectExistsTest.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const SelectExistsTest_one: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams) => Promise<(undefined | selectExistsTestResult)> = comments__sqlJS.SelectExistsTest.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const SelectExistsTest_expectOne: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: selectExistsTestResult }
  | { TAG: "Error"; _0: string }> = comments__sqlJS.SelectExistsTest.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const SelectExistsTest_execute: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams) => Promise<void> = comments__sqlJS.SelectExistsTest.execute as any;

export const selectExistsTest: (params:selectExistsTestParams, client:PgTyped_Pg_Client_t) => Promise<selectExistsTestResult[]> = comments__sqlJS.selectExistsTest as any;

export const SelectExistsTest: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: selectExistsTestResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams) => Promise<(undefined | selectExistsTestResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams) => Promise<selectExistsTestResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:selectExistsTestParams) => Promise<void>
} = comments__sqlJS.SelectExistsTest as any;

export const GetAllComments: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: getAllCommentsResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams) => Promise<(undefined | getAllCommentsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams) => Promise<getAllCommentsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsParams) => Promise<void>
} = comments__sqlJS.GetAllComments as any;

export const GetAllCommentsByIds: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: getAllCommentsByIdsResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams) => Promise<(undefined | getAllCommentsByIdsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams) => Promise<getAllCommentsByIdsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:getAllCommentsByIdsParams) => Promise<void>
} = comments__sqlJS.GetAllCommentsByIds as any;

export const InsertComment: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: insertCommentResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams) => Promise<(undefined | insertCommentResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams) => Promise<insertCommentResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:insertCommentParams) => Promise<void>
} = comments__sqlJS.InsertComment as any;
