/** Types generated for queries found in "src/books/BookService.res" */
open PgTyped


@gentype
type category = [#"novel" | #"science-fiction" | #"thriller"]

@gentype
type notification_type = [#"deadline" | #"notification" | #"reminder"]

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


/** 'Query2' parameters type */
@gentype
type query2Params = {
  authorName: string,
}

/** 'Query2' return type */
@gentype
type query2Result = {
  author_id: option<int>,
  big_int: option<bigint>,
  categories: option<categoryArray>,
  id: int,
  meta: option<arrayJSON_t>,
  name: option<string>,
  rank: option<int>,
}

/** 'Query2' query type */
@gentype
type query2Query = {
  params: query2Params,
  result: query2Result,
}

%%private(let query2IR: IR.t = %raw(`{"usedParamSet":{"authorName":true},"params":[{"name":"authorName","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":129}]}],"statement":"SELECT b.* FROM books b\n    INNER JOIN authors a ON a.id = b.author_id\n    WHERE a.first_name || ' ' || a.last_name = :authorName!"}`))

/**
 Runnable query:
 ```sql
SELECT b.* FROM books b
    INNER JOIN authors a ON a.id = b.author_id
    WHERE a.first_name || ' ' || a.last_name = $1
 ```

 */
@gentype
module Query2: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, query2Params) => promise<array<query2Result>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, query2Params) => promise<option<query2Result>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    query2Params,
    ~errorMessage: string=?
  ) => promise<result<query2Result, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, query2Params) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external query2: IR.t => PreparedStatement.t<query2Params, query2Result> = "PreparedQuery";
  let query = query2(query2IR)
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
@deprecated("Use 'Query2.many' directly instead")
let query2 = (params, ~client) => Query2.many(client, params)


@gentype
type query3Params_notification = {
  payload?: JSON.t,
  user_id?: int,
  @as("type") type_?: notification_type
}
/** 'Query3' parameters type */
@gentype
type query3Params = {
  notification: query3Params_notification,
}

/** 'Query3' return type */
@gentype
type query3Result = unit

/** 'Query3' query type */
@gentype
type query3Query = {
  params: query3Params,
  result: query3Result,
}

%%private(let query3IR: IR.t = %raw(`{"usedParamSet":{"notification":true},"params":[{"name":"notification","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"payload","required":false},{"name":"user_id","required":false},{"name":"type","required":false}]},"locs":[{"a":120,"b":132}]}],"statement":"                                                           \n  INSERT INTO notifications (payload, user_id, type) VALUES :notification"}`))

/**
 Runnable query:
 ```sql
                                                           
  INSERT INTO notifications (payload, user_id, type) VALUES ($1,$2,$3)
 ```

 */
@gentype
module Query3: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, query3Params) => promise<array<query3Result>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, query3Params) => promise<option<query3Result>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    query3Params,
    ~errorMessage: string=?
  ) => promise<result<query3Result, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, query3Params) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external query3: IR.t => PreparedStatement.t<query3Params, query3Result> = "PreparedQuery";
  let query = query3(query3IR)
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
@deprecated("Use 'Query3.many' directly instead")
let query3 = (params, ~client) => Query3.many(client, params)


@gentype
type query4Params_notification = {
  payload?: JSON.t,
  user_id?: int,
  @as("type") type_?: notification_type
}
/** 'Query4' parameters type */
@gentype
type query4Params = {
  notification: query4Params_notification,
}

/** 'Query4' return type */
@gentype
type query4Result = unit

/** 'Query4' query type */
@gentype
type query4Query = {
  params: query4Params,
  result: query4Result,
}

%%private(let query4IR: IR.t = %raw(`{"usedParamSet":{"notification":true},"params":[{"name":"notification","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"payload","required":false},{"name":"user_id","required":false},{"name":"type","required":false}]},"locs":[{"a":114,"b":126}]}],"statement":"                                                     \n  INSERT INTO notifications (payload, user_id, type) VALUES :notification"}`))

/**
 Runnable query:
 ```sql
                                                     
  INSERT INTO notifications (payload, user_id, type) VALUES ($1,$2,$3)
 ```

 */
@gentype
module Query4: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, query4Params) => promise<array<query4Result>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, query4Params) => promise<option<query4Result>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    query4Params,
    ~errorMessage: string=?
  ) => promise<result<query4Result, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, query4Params) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external query4: IR.t => PreparedStatement.t<query4Params, query4Result> = "PreparedQuery";
  let query = query4(query4IR)
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
@deprecated("Use 'Query4.many' directly instead")
let query4 = (params, ~client) => Query4.many(client, params)


