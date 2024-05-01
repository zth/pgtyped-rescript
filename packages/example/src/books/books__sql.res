/** Types generated for queries found in "src/books/books.sql" */
open PgTyped


@gentype
type category = [#"novel" | #"science-fiction" | #"thriller"]

@gentype
type iso31661Alpha2 = [#"AD" | #"AE" | #"AF" | #"AG" | #"AI" | #"AL" | #"AM" | #"AO" | #"AQ" | #"AR" | #"AS" | #"AT" | #"AU" | #"AW" | #"AX" | #"AZ" | #"BA" | #"BB" | #"BD" | #"BE" | #"BF" | #"BG" | #"BH" | #"BI" | #"BJ" | #"BL" | #"BM" | #"BN" | #"BO" | #"BQ" | #"BR" | #"BS" | #"BT" | #"BV" | #"BW" | #"BY" | #"BZ" | #"CA" | #"CC" | #"CD" | #"CF" | #"CG" | #"CH" | #"CI" | #"CK" | #"CL" | #"CM" | #"CN" | #"CO" | #"CR" | #"CU" | #"CV" | #"CW" | #"CX" | #"CY" | #"CZ" | #"DE" | #"DJ" | #"DK" | #"DM" | #"DO" | #"DZ" | #"EC" | #"EE" | #"EG" | #"EH" | #"ER" | #"ES" | #"ET" | #"FI" | #"FJ" | #"FK" | #"FM" | #"FO" | #"FR" | #"GA" | #"GB" | #"GD" | #"GE" | #"GF" | #"GG" | #"GH" | #"GI" | #"GL" | #"GM" | #"GN" | #"GP" | #"GQ" | #"GR" | #"GS" | #"GT" | #"GU" | #"GW" | #"GY" | #"HK" | #"HM" | #"HN" | #"HR" | #"HT" | #"HU" | #"ID" | #"IE" | #"IL" | #"IM" | #"IN" | #"IO" | #"IQ" | #"IR" | #"IS" | #"IT" | #"JE" | #"JM" | #"JO" | #"JP" | #"KE" | #"KG" | #"KH" | #"KI" | #"KM" | #"KN" | #"KP" | #"KR" | #"KW" | #"KY" | #"KZ" | #"LA" | #"LB" | #"LC" | #"LI" | #"LK" | #"LR" | #"LS" | #"LT" | #"LU" | #"LV" | #"LY" | #"MA" | #"MC" | #"MD" | #"ME" | #"MF" | #"MG" | #"MH" | #"MK" | #"ML" | #"MM" | #"MN" | #"MO" | #"MP" | #"MQ" | #"MR" | #"MS" | #"MT" | #"MU" | #"MV" | #"MW" | #"MX" | #"MY" | #"MZ" | #"NA" | #"NC" | #"NE" | #"NF" | #"NG" | #"NI" | #"NL" | #"NO" | #"NP" | #"NR" | #"NU" | #"NZ" | #"OM" | #"PA" | #"PE" | #"PF" | #"PG" | #"PH" | #"PK" | #"PL" | #"PM" | #"PN" | #"PR" | #"PS" | #"PT" | #"PW" | #"PY" | #"QA" | #"RE" | #"RO" | #"RS" | #"RU" | #"RW" | #"SA" | #"SB" | #"SC" | #"SD" | #"SE" | #"SG" | #"SH" | #"SI" | #"SJ" | #"SK" | #"SL" | #"SM" | #"SN" | #"SO" | #"SR" | #"SS" | #"ST" | #"SV" | #"SX" | #"SY" | #"SZ" | #"TC" | #"TD" | #"TF" | #"TG" | #"TH" | #"TJ" | #"TK" | #"TL" | #"TM"]

@gentype
type arrayJSON_t = array<JSON.t>

@gentype
type categoryArray = array<category>

@gentype
type intArray = array<int>

@gentype
type stringArray = array<string>

/** 'FindBookById' parameters type */
@gentype
type findBookByIdParams = {
  id?: int,
}

/** 'FindBookById' return type */
@gentype
type findBookByIdResult = {
  author_id: option<int>,
  big_int: option<bigint>,
  categories: option<categoryArray>,
  id: int,
  meta: option<arrayJSON_t>,
  name: option<string>,
  rank: option<int>,
}

/** 'FindBookById' query type */
@gentype
type findBookByIdQuery = {
  params: findBookByIdParams,
  result: findBookByIdResult,
}

%%private(let findBookByIdIR: IR.t = %raw(`{"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":33}]}],"statement":"SELECT * FROM books WHERE id = :id"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM books WHERE id = :id
 * ```
 */
@gentype
module FindBookById: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, findBookByIdParams) => promise<array<findBookByIdResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, findBookByIdParams) => promise<option<findBookByIdResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    findBookByIdParams,
    ~errorMessage: string=?
  ) => promise<result<findBookByIdResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, findBookByIdParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external findBookById: IR.t => PreparedStatement.t<findBookByIdParams, findBookByIdResult> = "PreparedQuery";
  let query = findBookById(findBookByIdIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'FindBookById.many' directly instead")
let findBookById = (params, ~client) => FindBookById.many(client, params)


/** 'FindBookByCategory' parameters type */
@gentype
type findBookByCategoryParams = {
  category?: category,
}

/** 'FindBookByCategory' return type */
@gentype
type findBookByCategoryResult = {
  author_id: option<int>,
  big_int: option<bigint>,
  categories: option<categoryArray>,
  id: int,
  meta: option<arrayJSON_t>,
  name: option<string>,
  rank: option<int>,
}

/** 'FindBookByCategory' query type */
@gentype
type findBookByCategoryQuery = {
  params: findBookByCategoryParams,
  result: findBookByCategoryResult,
}

%%private(let findBookByCategoryIR: IR.t = %raw(`{"usedParamSet":{"category":true},"params":[{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":26,"b":34}]}],"statement":"SELECT * FROM books WHERE :category = ANY(categories)"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM books WHERE :category = ANY(categories)
 * ```
 */
@gentype
module FindBookByCategory: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, findBookByCategoryParams) => promise<array<findBookByCategoryResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, findBookByCategoryParams) => promise<option<findBookByCategoryResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    findBookByCategoryParams,
    ~errorMessage: string=?
  ) => promise<result<findBookByCategoryResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, findBookByCategoryParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external findBookByCategory: IR.t => PreparedStatement.t<findBookByCategoryParams, findBookByCategoryResult> = "PreparedQuery";
  let query = findBookByCategory(findBookByCategoryIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'FindBookByCategory.many' directly instead")
let findBookByCategory = (params, ~client) => FindBookByCategory.many(client, params)


/** 'FindBookNameOrRank' parameters type */
@gentype
type findBookNameOrRankParams = {
  name?: string,
  rank?: int,
}

/** 'FindBookNameOrRank' return type */
@gentype
type findBookNameOrRankResult = {
  id: int,
  name: option<string>,
}

/** 'FindBookNameOrRank' query type */
@gentype
type findBookNameOrRankQuery = {
  params: findBookNameOrRankParams,
  result: findBookNameOrRankResult,
}

%%private(let findBookNameOrRankIR: IR.t = %raw(`{"usedParamSet":{"name":true,"rank":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":45}]},{"name":"rank","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":61}]}],"statement":"SELECT id, name\nFROM books\nWHERE (name = :name OR rank = :rank)"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT id, name
 * FROM books
 * WHERE (name = :name OR rank = :rank)
 * ```
 */
@gentype
module FindBookNameOrRank: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, findBookNameOrRankParams) => promise<array<findBookNameOrRankResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, findBookNameOrRankParams) => promise<option<findBookNameOrRankResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    findBookNameOrRankParams,
    ~errorMessage: string=?
  ) => promise<result<findBookNameOrRankResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, findBookNameOrRankParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external findBookNameOrRank: IR.t => PreparedStatement.t<findBookNameOrRankParams, findBookNameOrRankResult> = "PreparedQuery";
  let query = findBookNameOrRank(findBookNameOrRankIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'FindBookNameOrRank.many' directly instead")
let findBookNameOrRank = (params, ~client) => FindBookNameOrRank.many(client, params)


/** 'FindBookUnicode' parameters type */
@gentype
type findBookUnicodeParams = unit

/** 'FindBookUnicode' return type */
@gentype
type findBookUnicodeResult = {
  author_id: option<int>,
  big_int: option<bigint>,
  categories: option<categoryArray>,
  id: int,
  meta: option<arrayJSON_t>,
  name: option<string>,
  rank: option<int>,
}

/** 'FindBookUnicode' query type */
@gentype
type findBookUnicodeQuery = {
  params: findBookUnicodeParams,
  result: findBookUnicodeResult,
}

%%private(let findBookUnicodeIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT * FROM books WHERE name = 'שקל'"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM books WHERE name = 'שקל'
 * ```
 */
@gentype
module FindBookUnicode: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, findBookUnicodeParams) => promise<array<findBookUnicodeResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, findBookUnicodeParams) => promise<option<findBookUnicodeResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    findBookUnicodeParams,
    ~errorMessage: string=?
  ) => promise<result<findBookUnicodeResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, findBookUnicodeParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external findBookUnicode: IR.t => PreparedStatement.t<findBookUnicodeParams, findBookUnicodeResult> = "PreparedQuery";
  let query = findBookUnicode(findBookUnicodeIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'FindBookUnicode.many' directly instead")
let findBookUnicode = (params, ~client) => FindBookUnicode.many(client, params)


@gentype
type insertBooksParams_books = {
  rank: int,
  name: string,
  authorId: int,
  categories?: categoryArray
}
/** 'InsertBooks' parameters type */
@gentype
type insertBooksParams = {
  books: array<insertBooksParams_books>,
}

/** 'InsertBooks' return type */
@gentype
type insertBooksResult = {
  book_id: int,
}

/** 'InsertBooks' query type */
@gentype
type insertBooksQuery = {
  params: insertBooksParams,
  result: insertBooksResult,
}

%%private(let insertBooksIR: IR.t = %raw(`{"usedParamSet":{"books":true},"params":[{"name":"books","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"rank","required":true},{"name":"name","required":true},{"name":"authorId","required":true},{"name":"categories","required":false}]},"locs":[{"a":61,"b":66}]}],"statement":"INSERT INTO books (rank, name, author_id, categories)\nVALUES :books RETURNING id as book_id"}`))

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO books (rank, name, author_id, categories)
 * VALUES :books RETURNING id as book_id
 * ```
 */
@gentype
module InsertBooks: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, insertBooksParams) => promise<array<insertBooksResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, insertBooksParams) => promise<option<insertBooksResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    insertBooksParams,
    ~errorMessage: string=?
  ) => promise<result<insertBooksResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, insertBooksParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external insertBooks: IR.t => PreparedStatement.t<insertBooksParams, insertBooksResult> = "PreparedQuery";
  let query = insertBooks(insertBooksIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'InsertBooks.many' directly instead")
let insertBooks = (params, ~client) => InsertBooks.many(client, params)


/** 'InsertBook' parameters type */
@gentype
type insertBookParams = {
  author_id: int,
  categories?: categoryArray,
  name: string,
  rank: int,
}

/** 'InsertBook' return type */
@gentype
type insertBookResult = {
  book_id: int,
}

/** 'InsertBook' query type */
@gentype
type insertBookQuery = {
  params: insertBookParams,
  result: insertBookResult,
}

%%private(let insertBookIR: IR.t = %raw(`{"usedParamSet":{"rank":true,"name":true,"author_id":true,"categories":true},"params":[{"name":"rank","required":true,"transform":{"type":"scalar"},"locs":[{"a":62,"b":67}]},{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":70,"b":75}]},{"name":"author_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":78,"b":88}]},{"name":"categories","required":false,"transform":{"type":"scalar"},"locs":[{"a":91,"b":101}]}],"statement":"INSERT INTO books (rank, name, author_id, categories)\nVALUES (:rank!, :name!, :author_id!, :categories) RETURNING id as book_id"}`))

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO books (rank, name, author_id, categories)
 * VALUES (:rank!, :name!, :author_id!, :categories) RETURNING id as book_id
 * ```
 */
@gentype
module InsertBook: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, insertBookParams) => promise<array<insertBookResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, insertBookParams) => promise<option<insertBookResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    insertBookParams,
    ~errorMessage: string=?
  ) => promise<result<insertBookResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, insertBookParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external insertBook: IR.t => PreparedStatement.t<insertBookParams, insertBookResult> = "PreparedQuery";
  let query = insertBook(insertBookIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'InsertBook.many' directly instead")
let insertBook = (params, ~client) => InsertBook.many(client, params)


/** 'UpdateBooksCustom' parameters type */
@gentype
type updateBooksCustomParams = {
  id: int,
  rank?: int,
}

/** 'UpdateBooksCustom' return type */
@gentype
type updateBooksCustomResult = unit

/** 'UpdateBooksCustom' query type */
@gentype
type updateBooksCustomQuery = {
  params: updateBooksCustomParams,
  result: updateBooksCustomResult,
}

%%private(let updateBooksCustomIR: IR.t = %raw(`{"usedParamSet":{"rank":true,"id":true},"params":[{"name":"rank","required":false,"transform":{"type":"scalar"},"locs":[{"a":49,"b":53},{"a":95,"b":99}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":161,"b":164}]}],"statement":"UPDATE books\nSET\n    rank = (\n        CASE WHEN (:rank::int IS NOT NULL)\n                 THEN :rank\n             ELSE rank\n            END\n        )\nWHERE id = :id!"}`))

/**
 * Query generated from SQL:
 * ```
 * UPDATE books
 * SET
 *     rank = (
 *         CASE WHEN (:rank::int IS NOT NULL)
 *                  THEN :rank
 *              ELSE rank
 *             END
 *         )
 * WHERE id = :id!
 * ```
 */
@gentype
module UpdateBooksCustom: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, updateBooksCustomParams) => promise<array<updateBooksCustomResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, updateBooksCustomParams) => promise<option<updateBooksCustomResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    updateBooksCustomParams,
    ~errorMessage: string=?
  ) => promise<result<updateBooksCustomResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, updateBooksCustomParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external updateBooksCustom: IR.t => PreparedStatement.t<updateBooksCustomParams, updateBooksCustomResult> = "PreparedQuery";
  let query = updateBooksCustom(updateBooksCustomIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'UpdateBooksCustom.many' directly instead")
let updateBooksCustom = (params, ~client) => UpdateBooksCustom.many(client, params)


/** 'UpdateBooks' parameters type */
@gentype
type updateBooksParams = {
  id: int,
  name?: string,
  rank?: int,
}

/** 'UpdateBooks' return type */
@gentype
type updateBooksResult = unit

/** 'UpdateBooks' query type */
@gentype
type updateBooksQuery = {
  params: updateBooksParams,
  result: updateBooksResult,
}

%%private(let updateBooksIR: IR.t = %raw(`{"usedParamSet":{"name":true,"rank":true,"id":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":54}]},{"name":"rank","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":72}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":85,"b":88}]}],"statement":"UPDATE books\n                     \nSET\n    name = :name,\n    rank = :rank\nWHERE id = :id!"}`))

/**
 * Query generated from SQL:
 * ```
 * UPDATE books
 *                      
 * SET
 *     name = :name,
 *     rank = :rank
 * WHERE id = :id!
 * ```
 */
@gentype
module UpdateBooks: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, updateBooksParams) => promise<array<updateBooksResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, updateBooksParams) => promise<option<updateBooksResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    updateBooksParams,
    ~errorMessage: string=?
  ) => promise<result<updateBooksResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, updateBooksParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external updateBooks: IR.t => PreparedStatement.t<updateBooksParams, updateBooksResult> = "PreparedQuery";
  let query = updateBooks(updateBooksIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'UpdateBooks.many' directly instead")
let updateBooks = (params, ~client) => UpdateBooks.many(client, params)


/** 'UpdateBooksRankNotNull' parameters type */
@gentype
type updateBooksRankNotNullParams = {
  id: int,
  name?: string,
  rank: int,
}

/** 'UpdateBooksRankNotNull' return type */
@gentype
type updateBooksRankNotNullResult = unit

/** 'UpdateBooksRankNotNull' query type */
@gentype
type updateBooksRankNotNullQuery = {
  params: updateBooksRankNotNullParams,
  result: updateBooksRankNotNullResult,
}

%%private(let updateBooksRankNotNullIR: IR.t = %raw(`{"usedParamSet":{"rank":true,"name":true,"id":true},"params":[{"name":"rank","required":true,"transform":{"type":"scalar"},"locs":[{"a":28,"b":33}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":51}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":64,"b":67}]}],"statement":"UPDATE books\nSET\n    rank = :rank!,\n    name = :name\nWHERE id = :id!"}`))

/**
 * Query generated from SQL:
 * ```
 * UPDATE books
 * SET
 *     rank = :rank!,
 *     name = :name
 * WHERE id = :id!
 * ```
 */
@gentype
module UpdateBooksRankNotNull: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, updateBooksRankNotNullParams) => promise<array<updateBooksRankNotNullResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, updateBooksRankNotNullParams) => promise<option<updateBooksRankNotNullResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    updateBooksRankNotNullParams,
    ~errorMessage: string=?
  ) => promise<result<updateBooksRankNotNullResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, updateBooksRankNotNullParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external updateBooksRankNotNull: IR.t => PreparedStatement.t<updateBooksRankNotNullParams, updateBooksRankNotNullResult> = "PreparedQuery";
  let query = updateBooksRankNotNull(updateBooksRankNotNullIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'UpdateBooksRankNotNull.many' directly instead")
let updateBooksRankNotNull = (params, ~client) => UpdateBooksRankNotNull.many(client, params)


/** 'GetBooksByAuthorName' parameters type */
@gentype
type getBooksByAuthorNameParams = {
  authorName: string,
}

/** 'GetBooksByAuthorName' return type */
@gentype
type getBooksByAuthorNameResult = {
  author_id: option<int>,
  big_int: option<bigint>,
  categories: option<categoryArray>,
  id: int,
  meta: option<arrayJSON_t>,
  name: option<string>,
  rank: option<int>,
}

/** 'GetBooksByAuthorName' query type */
@gentype
type getBooksByAuthorNameQuery = {
  params: getBooksByAuthorNameParams,
  result: getBooksByAuthorNameResult,
}

%%private(let getBooksByAuthorNameIR: IR.t = %raw(`{"usedParamSet":{"authorName":true},"params":[{"name":"authorName","required":true,"transform":{"type":"scalar"},"locs":[{"a":110,"b":121}]}],"statement":"SELECT b.* FROM books b\nINNER JOIN authors a ON a.id = b.author_id\nWHERE a.first_name || ' ' || a.last_name = :authorName!"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT b.* FROM books b
 * INNER JOIN authors a ON a.id = b.author_id
 * WHERE a.first_name || ' ' || a.last_name = :authorName!
 * ```
 */
@gentype
module GetBooksByAuthorName: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, getBooksByAuthorNameParams) => promise<array<getBooksByAuthorNameResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, getBooksByAuthorNameParams) => promise<option<getBooksByAuthorNameResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    getBooksByAuthorNameParams,
    ~errorMessage: string=?
  ) => promise<result<getBooksByAuthorNameResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, getBooksByAuthorNameParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external getBooksByAuthorName: IR.t => PreparedStatement.t<getBooksByAuthorNameParams, getBooksByAuthorNameResult> = "PreparedQuery";
  let query = getBooksByAuthorName(getBooksByAuthorNameIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'GetBooksByAuthorName.many' directly instead")
let getBooksByAuthorName = (params, ~client) => GetBooksByAuthorName.many(client, params)


/** 'AggregateEmailsAndTest' parameters type */
@gentype
type aggregateEmailsAndTestParams = {
  testAges?: intArray,
}

/** 'AggregateEmailsAndTest' return type */
@gentype
type aggregateEmailsAndTestResult = {
  agetest: option<bool>,
  emails: stringArray,
}

/** 'AggregateEmailsAndTest' query type */
@gentype
type aggregateEmailsAndTestQuery = {
  params: aggregateEmailsAndTestParams,
  result: aggregateEmailsAndTestResult,
}

%%private(let aggregateEmailsAndTestIR: IR.t = %raw(`{"usedParamSet":{"testAges":true},"params":[{"name":"testAges","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":63}]}],"statement":"SELECT array_agg(email) as \"emails!\", array_agg(age) = :testAges as ageTest FROM users"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT array_agg(email) as "emails!", array_agg(age) = :testAges as ageTest FROM users
 * ```
 */
@gentype
module AggregateEmailsAndTest: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, aggregateEmailsAndTestParams) => promise<array<aggregateEmailsAndTestResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, aggregateEmailsAndTestParams) => promise<option<aggregateEmailsAndTestResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    aggregateEmailsAndTestParams,
    ~errorMessage: string=?
  ) => promise<result<aggregateEmailsAndTestResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, aggregateEmailsAndTestParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external aggregateEmailsAndTest: IR.t => PreparedStatement.t<aggregateEmailsAndTestParams, aggregateEmailsAndTestResult> = "PreparedQuery";
  let query = aggregateEmailsAndTest(aggregateEmailsAndTestIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'AggregateEmailsAndTest.many' directly instead")
let aggregateEmailsAndTest = (params, ~client) => AggregateEmailsAndTest.many(client, params)


/** 'GetBooks' parameters type */
@gentype
type getBooksParams = unit

/** 'GetBooks' return type */
@gentype
type getBooksResult = {
  id: int,
  name: string,
}

/** 'GetBooks' query type */
@gentype
type getBooksQuery = {
  params: getBooksParams,
  result: getBooksResult,
}

%%private(let getBooksIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT id, name as \"name!\" FROM books"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT id, name as "name!" FROM books
 * ```
 */
@gentype
module GetBooks: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, getBooksParams) => promise<array<getBooksResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, getBooksParams) => promise<option<getBooksResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    getBooksParams,
    ~errorMessage: string=?
  ) => promise<result<getBooksResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, getBooksParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external getBooks: IR.t => PreparedStatement.t<getBooksParams, getBooksResult> = "PreparedQuery";
  let query = getBooks(getBooksIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'GetBooks.many' directly instead")
let getBooks = (params, ~client) => GetBooks.many(client, params)


/** 'CountBooks' parameters type */
@gentype
type countBooksParams = unit

/** 'CountBooks' return type */
@gentype
type countBooksResult = {
  book_count: option<bigint>,
}

/** 'CountBooks' query type */
@gentype
type countBooksQuery = {
  params: countBooksParams,
  result: countBooksResult,
}

%%private(let countBooksIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT count(*) as book_count FROM books"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT count(*) as book_count FROM books
 * ```
 */
@gentype
module CountBooks: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, countBooksParams) => promise<array<countBooksResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, countBooksParams) => promise<option<countBooksResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    countBooksParams,
    ~errorMessage: string=?
  ) => promise<result<countBooksResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, countBooksParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external countBooks: IR.t => PreparedStatement.t<countBooksParams, countBooksResult> = "PreparedQuery";
  let query = countBooks(countBooksIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'CountBooks.many' directly instead")
let countBooks = (params, ~client) => CountBooks.many(client, params)


/** 'GetBookCountries' parameters type */
@gentype
type getBookCountriesParams = unit

/** 'GetBookCountries' return type */
@gentype
type getBookCountriesResult = {
  country: iso31661Alpha2,
  id: int,
}

/** 'GetBookCountries' query type */
@gentype
type getBookCountriesQuery = {
  params: getBookCountriesParams,
  result: getBookCountriesResult,
}

%%private(let getBookCountriesIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT * FROM book_country"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM book_country
 * ```
 */
@gentype
module GetBookCountries: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, getBookCountriesParams) => promise<array<getBookCountriesResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, getBookCountriesParams) => promise<option<getBookCountriesResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    getBookCountriesParams,
    ~errorMessage: string=?
  ) => promise<result<getBookCountriesResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, getBookCountriesParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external getBookCountries: IR.t => PreparedStatement.t<getBookCountriesParams, getBookCountriesResult> = "PreparedQuery";
  let query = getBookCountries(getBookCountriesIR)
  let query = (params, ~client) => query->PreparedStatement.run(params, ~client)

  @gentype
  let many = (client, params) => query(params, ~client)

  @gentype
  let one = async (client, params) => switch await query(params, ~client) {
  | [item] => Some(item)
  | _ => None
  }

  @gentype
  let expectOne = async (client, params, ~errorMessage=?) => switch await query(params, ~client) {
  | [item] => Ok(item)
  | _ => Error(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'GetBookCountries.many' directly instead")
let getBookCountries = (params, ~client) => GetBookCountries.many(client, params)


