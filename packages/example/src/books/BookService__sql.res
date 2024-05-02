/** Types generated for queries found in "src/books/BookService.res" */
open PgTyped


@gentype
type category = [#"novel" | #"science-fiction" | #"thriller"]

@gentype
type arrayJSON_t = array<JSON.t>

@gentype
type categoryArray = array<category>

/** 'Query1' parameters type */
@gentype
type query1Params = {
  authorName: string,
}

/** 'Query1' return type */
@gentype
type query1Result = {
  author_id: option<int>,
  big_int: option<bigint>,
  categories: option<categoryArray>,
  id: int,
  meta: option<arrayJSON_t>,
  name: option<string>,
  rank: option<int>,
}

/** 'Query1' query type */
@gentype
type query1Query = {
  params: query1Params,
  result: query1Result,
}

%%private(let query1IR: IR.t = %raw(`{"usedParamSet":{"authorName":true},"params":[{"name":"authorName","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":129}]}],"statement":"SELECT b.* FROM books b\n    INNER JOIN authors a ON a.id = b.author_id\n    WHERE a.first_name || ' ' || a.last_name = :authorName!"}`))

/**
 Runnable query:
 ```sql
SELECT b.* FROM books b
    INNER JOIN authors a ON a.id = b.author_id
    WHERE a.first_name || ' ' || a.last_name = $1
 ```

 */
@gentype
module Query1: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, query1Params) => promise<array<query1Result>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, query1Params) => promise<option<query1Result>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    query1Params,
    ~errorMessage: string=?
  ) => promise<result<query1Result, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, query1Params) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external query1: IR.t => PreparedStatement.t<query1Params, query1Result> = "PreparedQuery";
  let query = query1(query1IR)
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
@deprecated("Use 'Query1.many' directly instead")
let query1 = (params, ~client) => Query1.many(client, params)


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
 Runnable query:
 ```sql
SELECT * FROM books WHERE id = $1
 ```

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
  @module("pgtyped-rescript-runtime") @new external findBookById: IR.t => PreparedStatement.t<findBookByIdParams, findBookByIdResult> = "PreparedQuery";
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


