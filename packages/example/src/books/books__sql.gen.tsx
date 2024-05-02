/* TypeScript file generated from books__sql.res by genType. */

/* eslint-disable */
/* tslint:disable */

const books__sqlJS = require('./books__sql.js');

import type {Pg_Client_t as PgTyped_Pg_Client_t} from 'pgtyped-rescript/src/res/PgTyped.gen';

import type {t as JSON_t} from './JSON.gen';

export type category = "novel" | "science-fiction" | "thriller";

export type iso31661Alpha2 = 
    "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AO"
  | "AQ"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ"
  | "BR"
  | "BS"
  | "BT"
  | "BV"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GS"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HM"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PN"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TC"
  | "TD"
  | "TF"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM";

export type arrayJSON_t = JSON_t[];

export type categoryArray = category[];

export type intArray = number[];

export type stringArray = string[];

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

/** 'FindBookByCategory' parameters type */
export type findBookByCategoryParams = { readonly category?: category };

/** 'FindBookByCategory' return type */
export type findBookByCategoryResult = {
  readonly author_id: (undefined | number); 
  readonly big_int: (undefined | bigint); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly meta: (undefined | arrayJSON_t); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'FindBookByCategory' query type */
export type findBookByCategoryQuery = { readonly params: findBookByCategoryParams; readonly result: findBookByCategoryResult };

/** 'FindBookNameOrRank' parameters type */
export type findBookNameOrRankParams = { readonly name?: string; readonly rank?: number };

/** 'FindBookNameOrRank' return type */
export type findBookNameOrRankResult = { readonly id: number; readonly name: (undefined | string) };

/** 'FindBookNameOrRank' query type */
export type findBookNameOrRankQuery = { readonly params: findBookNameOrRankParams; readonly result: findBookNameOrRankResult };

/** 'FindBookUnicode' parameters type */
export type findBookUnicodeParams = void;

/** 'FindBookUnicode' return type */
export type findBookUnicodeResult = {
  readonly author_id: (undefined | number); 
  readonly big_int: (undefined | bigint); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly meta: (undefined | arrayJSON_t); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'FindBookUnicode' query type */
export type findBookUnicodeQuery = { readonly params: findBookUnicodeParams; readonly result: findBookUnicodeResult };

export type insertBooksParams_books = {
  readonly rank: number; 
  readonly name: string; 
  readonly authorId: number; 
  readonly categories?: categoryArray
};

/** 'InsertBooks' parameters type */
export type insertBooksParams = { readonly books: insertBooksParams_books[] };

/** 'InsertBooks' return type */
export type insertBooksResult = { readonly book_id: number };

/** 'InsertBooks' query type */
export type insertBooksQuery = { readonly params: insertBooksParams; readonly result: insertBooksResult };

/** 'InsertBook' parameters type */
export type insertBookParams = {
  readonly author_id: number; 
  readonly categories?: categoryArray; 
  readonly name: string; 
  readonly rank: number
};

/** 'InsertBook' return type */
export type insertBookResult = { readonly book_id: number };

/** 'InsertBook' query type */
export type insertBookQuery = { readonly params: insertBookParams; readonly result: insertBookResult };

/** 'UpdateBooksCustom' parameters type */
export type updateBooksCustomParams = { readonly id: number; readonly rank?: number };

/** 'UpdateBooksCustom' return type */
export type updateBooksCustomResult = void;

/** 'UpdateBooksCustom' query type */
export type updateBooksCustomQuery = { readonly params: updateBooksCustomParams; readonly result: updateBooksCustomResult };

/** 'UpdateBooks' parameters type */
export type updateBooksParams = {
  readonly id: number; 
  readonly name?: string; 
  readonly rank?: number
};

/** 'UpdateBooks' return type */
export type updateBooksResult = void;

/** 'UpdateBooks' query type */
export type updateBooksQuery = { readonly params: updateBooksParams; readonly result: updateBooksResult };

/** 'UpdateBooksRankNotNull' parameters type */
export type updateBooksRankNotNullParams = {
  readonly id: number; 
  readonly name?: string; 
  readonly rank: number
};

/** 'UpdateBooksRankNotNull' return type */
export type updateBooksRankNotNullResult = void;

/** 'UpdateBooksRankNotNull' query type */
export type updateBooksRankNotNullQuery = { readonly params: updateBooksRankNotNullParams; readonly result: updateBooksRankNotNullResult };

/** 'GetBooksByAuthorName' parameters type */
export type getBooksByAuthorNameParams = { readonly authorName: string };

/** 'GetBooksByAuthorName' return type */
export type getBooksByAuthorNameResult = {
  readonly author_id: (undefined | number); 
  readonly big_int: (undefined | bigint); 
  readonly categories: (undefined | categoryArray); 
  readonly id: number; 
  readonly meta: (undefined | arrayJSON_t); 
  readonly name: (undefined | string); 
  readonly rank: (undefined | number)
};

/** 'GetBooksByAuthorName' query type */
export type getBooksByAuthorNameQuery = { readonly params: getBooksByAuthorNameParams; readonly result: getBooksByAuthorNameResult };

/** 'AggregateEmailsAndTest' parameters type */
export type aggregateEmailsAndTestParams = { readonly testAges?: intArray };

/** 'AggregateEmailsAndTest' return type */
export type aggregateEmailsAndTestResult = { readonly agetest: (undefined | boolean); readonly emails: stringArray };

/** 'AggregateEmailsAndTest' query type */
export type aggregateEmailsAndTestQuery = { readonly params: aggregateEmailsAndTestParams; readonly result: aggregateEmailsAndTestResult };

/** 'GetBooks' parameters type */
export type getBooksParams = void;

/** 'GetBooks' return type */
export type getBooksResult = { readonly id: number; readonly name: string };

/** 'GetBooks' query type */
export type getBooksQuery = { readonly params: getBooksParams; readonly result: getBooksResult };

/** 'CountBooks' parameters type */
export type countBooksParams = void;

/** 'CountBooks' return type */
export type countBooksResult = { readonly book_count: (undefined | bigint) };

/** 'CountBooks' query type */
export type countBooksQuery = { readonly params: countBooksParams; readonly result: countBooksResult };

/** 'GetBookCountries' parameters type */
export type getBookCountriesParams = void;

/** 'GetBookCountries' return type */
export type getBookCountriesResult = { readonly country: iso31661Alpha2; readonly id: number };

/** 'GetBookCountries' query type */
export type getBookCountriesQuery = { readonly params: getBookCountriesParams; readonly result: getBookCountriesResult };

/** Returns an array of all matched results. */
export const FindBookById_many: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<findBookByIdResult[]> = books__sqlJS.FindBookById.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const FindBookById_one: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<(undefined | findBookByIdResult)> = books__sqlJS.FindBookById.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const FindBookById_expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams, errorMessage:(undefined | string)) => Promise<findBookByIdResult> = books__sqlJS.FindBookById.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const FindBookById_execute: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<void> = books__sqlJS.FindBookById.execute as any;

export const findBookById: (params:findBookByIdParams, client:PgTyped_Pg_Client_t) => Promise<findBookByIdResult[]> = books__sqlJS.findBookById as any;

/** Returns an array of all matched results. */
export const FindBookByCategory_many: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams) => Promise<findBookByCategoryResult[]> = books__sqlJS.FindBookByCategory.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const FindBookByCategory_one: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams) => Promise<(undefined | findBookByCategoryResult)> = books__sqlJS.FindBookByCategory.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const FindBookByCategory_expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams, errorMessage:(undefined | string)) => Promise<findBookByCategoryResult> = books__sqlJS.FindBookByCategory.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const FindBookByCategory_execute: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams) => Promise<void> = books__sqlJS.FindBookByCategory.execute as any;

export const findBookByCategory: (params:findBookByCategoryParams, client:PgTyped_Pg_Client_t) => Promise<findBookByCategoryResult[]> = books__sqlJS.findBookByCategory as any;

/** Returns an array of all matched results. */
export const FindBookNameOrRank_many: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams) => Promise<findBookNameOrRankResult[]> = books__sqlJS.FindBookNameOrRank.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const FindBookNameOrRank_one: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams) => Promise<(undefined | findBookNameOrRankResult)> = books__sqlJS.FindBookNameOrRank.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const FindBookNameOrRank_expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams, errorMessage:(undefined | string)) => Promise<findBookNameOrRankResult> = books__sqlJS.FindBookNameOrRank.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const FindBookNameOrRank_execute: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams) => Promise<void> = books__sqlJS.FindBookNameOrRank.execute as any;

export const findBookNameOrRank: (params:findBookNameOrRankParams, client:PgTyped_Pg_Client_t) => Promise<findBookNameOrRankResult[]> = books__sqlJS.findBookNameOrRank as any;

/** Returns an array of all matched results. */
export const FindBookUnicode_many: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams) => Promise<findBookUnicodeResult[]> = books__sqlJS.FindBookUnicode.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const FindBookUnicode_one: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams) => Promise<(undefined | findBookUnicodeResult)> = books__sqlJS.FindBookUnicode.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const FindBookUnicode_expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams, errorMessage:(undefined | string)) => Promise<findBookUnicodeResult> = books__sqlJS.FindBookUnicode.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const FindBookUnicode_execute: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams) => Promise<void> = books__sqlJS.FindBookUnicode.execute as any;

export const findBookUnicode: (params:findBookUnicodeParams, client:PgTyped_Pg_Client_t) => Promise<findBookUnicodeResult[]> = books__sqlJS.findBookUnicode as any;

/** Returns an array of all matched results. */
export const InsertBooks_many: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams) => Promise<insertBooksResult[]> = books__sqlJS.InsertBooks.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const InsertBooks_one: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams) => Promise<(undefined | insertBooksResult)> = books__sqlJS.InsertBooks.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const InsertBooks_expectOne: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams, errorMessage:(undefined | string)) => Promise<insertBooksResult> = books__sqlJS.InsertBooks.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const InsertBooks_execute: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams) => Promise<void> = books__sqlJS.InsertBooks.execute as any;

export const insertBooks: (params:insertBooksParams, client:PgTyped_Pg_Client_t) => Promise<insertBooksResult[]> = books__sqlJS.insertBooks as any;

/** Returns an array of all matched results. */
export const InsertBook_many: (_1:PgTyped_Pg_Client_t, _2:insertBookParams) => Promise<insertBookResult[]> = books__sqlJS.InsertBook.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const InsertBook_one: (_1:PgTyped_Pg_Client_t, _2:insertBookParams) => Promise<(undefined | insertBookResult)> = books__sqlJS.InsertBook.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const InsertBook_expectOne: (_1:PgTyped_Pg_Client_t, _2:insertBookParams, errorMessage:(undefined | string)) => Promise<insertBookResult> = books__sqlJS.InsertBook.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const InsertBook_execute: (_1:PgTyped_Pg_Client_t, _2:insertBookParams) => Promise<void> = books__sqlJS.InsertBook.execute as any;

export const insertBook: (params:insertBookParams, client:PgTyped_Pg_Client_t) => Promise<insertBookResult[]> = books__sqlJS.insertBook as any;

/** Returns an array of all matched results. */
export const UpdateBooksCustom_many: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams) => Promise<updateBooksCustomResult[]> = books__sqlJS.UpdateBooksCustom.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const UpdateBooksCustom_one: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams) => Promise<(undefined | updateBooksCustomResult)> = books__sqlJS.UpdateBooksCustom.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const UpdateBooksCustom_expectOne: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams, errorMessage:(undefined | string)) => Promise<updateBooksCustomResult> = books__sqlJS.UpdateBooksCustom.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const UpdateBooksCustom_execute: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams) => Promise<void> = books__sqlJS.UpdateBooksCustom.execute as any;

export const updateBooksCustom: (params:updateBooksCustomParams, client:PgTyped_Pg_Client_t) => Promise<updateBooksCustomResult[]> = books__sqlJS.updateBooksCustom as any;

/** Returns an array of all matched results. */
export const UpdateBooks_many: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams) => Promise<updateBooksResult[]> = books__sqlJS.UpdateBooks.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const UpdateBooks_one: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams) => Promise<(undefined | updateBooksResult)> = books__sqlJS.UpdateBooks.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const UpdateBooks_expectOne: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams, errorMessage:(undefined | string)) => Promise<updateBooksResult> = books__sqlJS.UpdateBooks.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const UpdateBooks_execute: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams) => Promise<void> = books__sqlJS.UpdateBooks.execute as any;

export const updateBooks: (params:updateBooksParams, client:PgTyped_Pg_Client_t) => Promise<updateBooksResult[]> = books__sqlJS.updateBooks as any;

/** Returns an array of all matched results. */
export const UpdateBooksRankNotNull_many: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams) => Promise<updateBooksRankNotNullResult[]> = books__sqlJS.UpdateBooksRankNotNull.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const UpdateBooksRankNotNull_one: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams) => Promise<(undefined | updateBooksRankNotNullResult)> = books__sqlJS.UpdateBooksRankNotNull.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const UpdateBooksRankNotNull_expectOne: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams, errorMessage:(undefined | string)) => Promise<updateBooksRankNotNullResult> = books__sqlJS.UpdateBooksRankNotNull.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const UpdateBooksRankNotNull_execute: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams) => Promise<void> = books__sqlJS.UpdateBooksRankNotNull.execute as any;

export const updateBooksRankNotNull: (params:updateBooksRankNotNullParams, client:PgTyped_Pg_Client_t) => Promise<updateBooksRankNotNullResult[]> = books__sqlJS.updateBooksRankNotNull as any;

/** Returns an array of all matched results. */
export const GetBooksByAuthorName_many: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams) => Promise<getBooksByAuthorNameResult[]> = books__sqlJS.GetBooksByAuthorName.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const GetBooksByAuthorName_one: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams) => Promise<(undefined | getBooksByAuthorNameResult)> = books__sqlJS.GetBooksByAuthorName.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const GetBooksByAuthorName_expectOne: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams, errorMessage:(undefined | string)) => Promise<getBooksByAuthorNameResult> = books__sqlJS.GetBooksByAuthorName.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const GetBooksByAuthorName_execute: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams) => Promise<void> = books__sqlJS.GetBooksByAuthorName.execute as any;

export const getBooksByAuthorName: (params:getBooksByAuthorNameParams, client:PgTyped_Pg_Client_t) => Promise<getBooksByAuthorNameResult[]> = books__sqlJS.getBooksByAuthorName as any;

/** Returns an array of all matched results. */
export const AggregateEmailsAndTest_many: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams) => Promise<aggregateEmailsAndTestResult[]> = books__sqlJS.AggregateEmailsAndTest.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const AggregateEmailsAndTest_one: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams) => Promise<(undefined | aggregateEmailsAndTestResult)> = books__sqlJS.AggregateEmailsAndTest.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const AggregateEmailsAndTest_expectOne: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams, errorMessage:(undefined | string)) => Promise<aggregateEmailsAndTestResult> = books__sqlJS.AggregateEmailsAndTest.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const AggregateEmailsAndTest_execute: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams) => Promise<void> = books__sqlJS.AggregateEmailsAndTest.execute as any;

export const aggregateEmailsAndTest: (params:aggregateEmailsAndTestParams, client:PgTyped_Pg_Client_t) => Promise<aggregateEmailsAndTestResult[]> = books__sqlJS.aggregateEmailsAndTest as any;

/** Returns an array of all matched results. */
export const GetBooks_many: (_1:PgTyped_Pg_Client_t, _2:getBooksParams) => Promise<getBooksResult[]> = books__sqlJS.GetBooks.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const GetBooks_one: (_1:PgTyped_Pg_Client_t, _2:getBooksParams) => Promise<(undefined | getBooksResult)> = books__sqlJS.GetBooks.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const GetBooks_expectOne: (_1:PgTyped_Pg_Client_t, _2:getBooksParams, errorMessage:(undefined | string)) => Promise<getBooksResult> = books__sqlJS.GetBooks.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const GetBooks_execute: (_1:PgTyped_Pg_Client_t, _2:getBooksParams) => Promise<void> = books__sqlJS.GetBooks.execute as any;

export const getBooks: (params:getBooksParams, client:PgTyped_Pg_Client_t) => Promise<getBooksResult[]> = books__sqlJS.getBooks as any;

/** Returns an array of all matched results. */
export const CountBooks_many: (_1:PgTyped_Pg_Client_t, _2:countBooksParams) => Promise<countBooksResult[]> = books__sqlJS.CountBooks.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const CountBooks_one: (_1:PgTyped_Pg_Client_t, _2:countBooksParams) => Promise<(undefined | countBooksResult)> = books__sqlJS.CountBooks.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const CountBooks_expectOne: (_1:PgTyped_Pg_Client_t, _2:countBooksParams, errorMessage:(undefined | string)) => Promise<countBooksResult> = books__sqlJS.CountBooks.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const CountBooks_execute: (_1:PgTyped_Pg_Client_t, _2:countBooksParams) => Promise<void> = books__sqlJS.CountBooks.execute as any;

export const countBooks: (params:countBooksParams, client:PgTyped_Pg_Client_t) => Promise<countBooksResult[]> = books__sqlJS.countBooks as any;

/** Returns an array of all matched results. */
export const GetBookCountries_many: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams) => Promise<getBookCountriesResult[]> = books__sqlJS.GetBookCountries.many as any;

/** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
export const GetBookCountries_one: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams) => Promise<(undefined | getBookCountriesResult)> = books__sqlJS.GetBookCountries.one as any;

/** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
export const GetBookCountries_expectOne: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams, errorMessage:(undefined | string)) => Promise<getBookCountriesResult> = books__sqlJS.GetBookCountries.expectOne as any;

/** Executes the query, but ignores whatever is returned by it. */
export const GetBookCountries_execute: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams) => Promise<void> = books__sqlJS.GetBookCountries.execute as any;

export const getBookCountries: (params:getBookCountriesParams, client:PgTyped_Pg_Client_t) => Promise<getBookCountriesResult[]> = books__sqlJS.getBookCountries as any;

export const FindBookNameOrRank: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams, errorMessage:(undefined | string)) => Promise<findBookNameOrRankResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams) => Promise<(undefined | findBookNameOrRankResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams) => Promise<findBookNameOrRankResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:findBookNameOrRankParams) => Promise<void>
} = books__sqlJS.FindBookNameOrRank as any;

export const UpdateBooks: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams, errorMessage:(undefined | string)) => Promise<updateBooksResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams) => Promise<(undefined | updateBooksResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams) => Promise<updateBooksResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:updateBooksParams) => Promise<void>
} = books__sqlJS.UpdateBooks as any;

export const InsertBook: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:insertBookParams, errorMessage:(undefined | string)) => Promise<insertBookResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:insertBookParams) => Promise<(undefined | insertBookResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:insertBookParams) => Promise<insertBookResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:insertBookParams) => Promise<void>
} = books__sqlJS.InsertBook as any;

export const FindBookByCategory: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams, errorMessage:(undefined | string)) => Promise<findBookByCategoryResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams) => Promise<(undefined | findBookByCategoryResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams) => Promise<findBookByCategoryResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:findBookByCategoryParams) => Promise<void>
} = books__sqlJS.FindBookByCategory as any;

export const AggregateEmailsAndTest: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams, errorMessage:(undefined | string)) => Promise<aggregateEmailsAndTestResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams) => Promise<(undefined | aggregateEmailsAndTestResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams) => Promise<aggregateEmailsAndTestResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:aggregateEmailsAndTestParams) => Promise<void>
} = books__sqlJS.AggregateEmailsAndTest as any;

export const CountBooks: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:countBooksParams, errorMessage:(undefined | string)) => Promise<countBooksResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:countBooksParams) => Promise<(undefined | countBooksResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:countBooksParams) => Promise<countBooksResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:countBooksParams) => Promise<void>
} = books__sqlJS.CountBooks as any;

export const GetBooksByAuthorName: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams, errorMessage:(undefined | string)) => Promise<getBooksByAuthorNameResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams) => Promise<(undefined | getBooksByAuthorNameResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams) => Promise<getBooksByAuthorNameResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:getBooksByAuthorNameParams) => Promise<void>
} = books__sqlJS.GetBooksByAuthorName as any;

export const FindBookById: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams, errorMessage:(undefined | string)) => Promise<findBookByIdResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<(undefined | findBookByIdResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<findBookByIdResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:findBookByIdParams) => Promise<void>
} = books__sqlJS.FindBookById as any;

export const GetBooks: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:getBooksParams, errorMessage:(undefined | string)) => Promise<getBooksResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:getBooksParams) => Promise<(undefined | getBooksResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:getBooksParams) => Promise<getBooksResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:getBooksParams) => Promise<void>
} = books__sqlJS.GetBooks as any;

export const UpdateBooksCustom: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams, errorMessage:(undefined | string)) => Promise<updateBooksCustomResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams) => Promise<(undefined | updateBooksCustomResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams) => Promise<updateBooksCustomResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:updateBooksCustomParams) => Promise<void>
} = books__sqlJS.UpdateBooksCustom as any;

export const InsertBooks: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams, errorMessage:(undefined | string)) => Promise<insertBooksResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams) => Promise<(undefined | insertBooksResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams) => Promise<insertBooksResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:insertBooksParams) => Promise<void>
} = books__sqlJS.InsertBooks as any;

export const UpdateBooksRankNotNull: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams, errorMessage:(undefined | string)) => Promise<updateBooksRankNotNullResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams) => Promise<(undefined | updateBooksRankNotNullResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams) => Promise<updateBooksRankNotNullResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:updateBooksRankNotNullParams) => Promise<void>
} = books__sqlJS.UpdateBooksRankNotNull as any;

export const GetBookCountries: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams, errorMessage:(undefined | string)) => Promise<getBookCountriesResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams) => Promise<(undefined | getBookCountriesResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams) => Promise<getBookCountriesResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:getBookCountriesParams) => Promise<void>
} = books__sqlJS.GetBookCountries as any;

export const FindBookUnicode: {
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  expectOne: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams, errorMessage:(undefined | string)) => Promise<findBookUnicodeResult>; 
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  one: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams) => Promise<(undefined | findBookUnicodeResult)>; 
  /** Returns an array of all matched results. */
  many: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams) => Promise<findBookUnicodeResult[]>; 
  /** Executes the query, but ignores whatever is returned by it. */
  execute: (_1:PgTyped_Pg_Client_t, _2:findBookUnicodeParams) => Promise<void>
} = books__sqlJS.FindBookUnicode as any;
