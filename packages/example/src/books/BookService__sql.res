/** Types generated for queries found in "src/books/BookService.res" */
open PgTyped


@gentype
type category = [#"novel" | #"science-fiction" | #"thriller"]

@gentype
type arrayJSON_t = array<JSON.t>

@gentype
type categoryArray = array<category>

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


/** 'BooksByAuthor' parameters type */
@gentype
type booksByAuthorParams = {
  authorName: string,
}

/** 'BooksByAuthor' return type */
@gentype
type booksByAuthorResult = {
  author_id: option<int>,
  big_int: option<bigint>,
  categories: option<categoryArray>,
  id: int,
  meta: option<arrayJSON_t>,
  name: option<string>,
  rank: option<int>,
}

/** 'BooksByAuthor' query type */
@gentype
type booksByAuthorQuery = {
  params: booksByAuthorParams,
  result: booksByAuthorResult,
}

%%private(let booksByAuthorIR: IR.t = %raw(`{"usedParamSet":{"authorName":true},"params":[{"name":"authorName","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":129}]}],"statement":"SELECT b.* FROM books b\n    INNER JOIN authors a ON a.id = b.author_id\n    WHERE a.first_name || ' ' || a.last_name = :authorName!"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT b.* FROM books b
 *     INNER JOIN authors a ON a.id = b.author_id
 *     WHERE a.first_name || ' ' || a.last_name = :authorName!
 * ```
 */
@gentype
module BooksByAuthor: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, booksByAuthorParams) => promise<array<booksByAuthorResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, booksByAuthorParams) => promise<option<booksByAuthorResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    booksByAuthorParams,
    ~errorMessage: string=?
  ) => promise<result<booksByAuthorResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, booksByAuthorParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external booksByAuthor: IR.t => PreparedStatement.t<booksByAuthorParams, booksByAuthorResult> = "PreparedQuery";
  let query = booksByAuthor(booksByAuthorIR)
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
@deprecated("Use 'BooksByAuthor.many' directly instead")
let booksByAuthor = (params, ~client) => BooksByAuthor.many(client, params)


