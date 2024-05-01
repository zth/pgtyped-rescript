/* TypeScript file generated from notifications__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const notifications__sqlJS = require('./notifications__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {dateOrString as PgTyped_dateOrString} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

export type notification_type = "deadline" | "notification" | "reminder";

export type sendNotificationsParams_notifications = {
  readonly user_id: number; 
  readonly payload: JSON_t; 
  readonly type: notification_type
};

/** 'SendNotifications' parameters type */
export type sendNotificationsParams = { readonly notifications: sendNotificationsParams_notifications[] };

/** 'SendNotifications' return type */
export type sendNotificationsResult = { readonly notification_id: number };

/** 'SendNotifications' query type */
export type sendNotificationsQuery = { readonly params: sendNotificationsParams; readonly result: sendNotificationsResult };

/** 'GetNotifications' parameters type */
export type getNotificationsParams = { readonly date: PgTyped_dateOrString; readonly userId?: number };

/** 'GetNotifications' return type */
export type getNotificationsResult = {
  readonly created_at: string; 
  readonly id: number; 
  readonly payload: JSON_t; 
  readonly type: notification_type; 
  readonly user_id: (undefined | number)
};

/** 'GetNotifications' query type */
export type getNotificationsQuery = { readonly params: getNotificationsParams; readonly result: getNotificationsResult };

/** 'ThresholdFrogs' parameters type */
export type thresholdFrogsParams = { readonly numFrogs: number };

/** 'ThresholdFrogs' return type */
export type thresholdFrogsResult = {
  readonly payload: JSON_t; 
  readonly type: notification_type; 
  readonly user_name: string
};

/** 'ThresholdFrogs' query type */
export type thresholdFrogsQuery = { readonly params: thresholdFrogsParams; readonly result: thresholdFrogsResult };

/** Returns an array of all matched results. */
export const SendNotifications_many: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams) => Promise<sendNotificationsResult[]> = notifications__sqlJS.SendNotifications.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const SendNotifications_one: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams) => Promise<(undefined | sendNotificationsResult)> = notifications__sqlJS.SendNotifications.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const SendNotifications_expectOne: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: sendNotificationsResult }
  | { TAG: "Error"; _0: string }> = notifications__sqlJS.SendNotifications.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const SendNotifications_execute: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams) => Promise<void> = notifications__sqlJS.SendNotifications.execute as any;

export const sendNotifications: (params:sendNotificationsParams, client:PgTyped_Pg_Client_t) => Promise<sendNotificationsResult[]> = notifications__sqlJS.sendNotifications as any;

/** Returns an array of all matched results. */
export const GetNotifications_many: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams) => Promise<getNotificationsResult[]> = notifications__sqlJS.GetNotifications.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const GetNotifications_one: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams) => Promise<(undefined | getNotificationsResult)> = notifications__sqlJS.GetNotifications.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const GetNotifications_expectOne: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: getNotificationsResult }
  | { TAG: "Error"; _0: string }> = notifications__sqlJS.GetNotifications.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const GetNotifications_execute: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams) => Promise<void> = notifications__sqlJS.GetNotifications.execute as any;

export const getNotifications: (params:getNotificationsParams, client:PgTyped_Pg_Client_t) => Promise<getNotificationsResult[]> = notifications__sqlJS.getNotifications as any;

/** Returns an array of all matched results. */
export const ThresholdFrogs_many: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams) => Promise<thresholdFrogsResult[]> = notifications__sqlJS.ThresholdFrogs.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const ThresholdFrogs_one: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams) => Promise<(undefined | thresholdFrogsResult)> = notifications__sqlJS.ThresholdFrogs.one as any;

/** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const ThresholdFrogs_expectOne: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams, errorMessage:(undefined | string)) => Promise<
    { TAG: "Ok"; _0: thresholdFrogsResult }
  | { TAG: "Error"; _0: string }> = notifications__sqlJS.ThresholdFrogs.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const ThresholdFrogs_execute: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams) => Promise<void> = notifications__sqlJS.ThresholdFrogs.execute as any;

export const thresholdFrogs: (params:thresholdFrogsParams, client:PgTyped_Pg_Client_t) => Promise<thresholdFrogsResult[]> = notifications__sqlJS.thresholdFrogs as any;

export const ThresholdFrogs: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: thresholdFrogsResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams) => Promise<(undefined | thresholdFrogsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams) => Promise<thresholdFrogsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:thresholdFrogsParams) => Promise<void>
} = notifications__sqlJS.ThresholdFrogs as any;

export const SendNotifications: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: sendNotificationsResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams) => Promise<(undefined | sendNotificationsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams) => Promise<sendNotificationsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:sendNotificationsParams) => Promise<void>
} = notifications__sqlJS.SendNotifications as any;

export const GetNotifications: {
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams, errorMessage:(undefined | string)) => Promise<
    {
    TAG: "Ok"; 
    _0: getNotificationsResult
  }
  | {
    TAG: "Error"; 
    _0: string
  }>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams) => Promise<(undefined | getNotificationsResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams) => Promise<getNotificationsResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:getNotificationsParams) => Promise<void>
} = notifications__sqlJS.GetNotifications as any;
