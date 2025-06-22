/** Types generated for queries found in "src/books/Json.res" */
open PgTyped


@gentype
type category = [#"novel" | #"science-fiction" | #"thriller"]

@gentype
type categoryArray = array<category>


/** 'Json' parameters type */
@gentype
type jsonParams = unit

/** 'Json' return type */
@gentype
type jsonResult = {
  json_object: option<JSON.t>,
}

/** 'Json' query type */
@gentype
type jsonQuery = {
  params: jsonParams,
  result: jsonResult,
}

%%private(let jsonIR: IR.t = %raw(`{"queryName":"Json","usedParamSet":{},"params":[],"statement":"SELECT json_build_object('key', 'value') AS json_object"}`))

/**
 Runnable query:
 ```sql
SELECT json_build_object('key', 'value') AS json_object
 ```

 */
@gentype
module Json: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, jsonParams) => promise<array<jsonResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, jsonParams) => promise<option<jsonResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    jsonParams,
    ~errorMessage: string=?
  ) => promise<jsonResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, jsonParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external json: IR.t => PreparedStatement.t<jsonParams, jsonResult> = "PreparedQuery";
  let query = json(jsonIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}


@gentype
type jsonPopulateRecord_booksInputType = {
  author_id?: int,
  categories?: categoryArray,
  id?: int,
  name?: string,
  rank?: int,
}


/** 'JsonPopulateRecord' parameters type */
@gentype
type jsonPopulateRecordParams = {
  book: jsonPopulateRecord_booksInputType,
}

/** 'JsonPopulateRecord' return type */
@gentype
type jsonPopulateRecordResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: option<int>,
  name: option<string>,
  rank: option<int>,
}

/** 'JsonPopulateRecord' query type */
@gentype
type jsonPopulateRecordQuery = {
  params: jsonPopulateRecordParams,
  result: jsonPopulateRecordResult,
}

%%private(let jsonPopulateRecordIR: IR.t = %raw(`{"queryName":"JsonPopulateRecord","inputParamTransforms":{"1":{"type":"stringify"}},"usedParamSet":{"book":true},"params":[{"name":"book","required":true,"transform":{"type":"scalar"},"locs":[{"a":57,"b":62}]}],"statement":"SELECT * FROM json_populate_record(\n    null::books,\n    :book!\n  )"}`))

/**
 Runnable query:
 ```sql
SELECT * FROM json_populate_record(
    null::books,
    $1
  )
 ```

 */
@gentype
module JsonPopulateRecord: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, jsonPopulateRecordParams) => promise<array<jsonPopulateRecordResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, jsonPopulateRecordParams) => promise<option<jsonPopulateRecordResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    jsonPopulateRecordParams,
    ~errorMessage: string=?
  ) => promise<jsonPopulateRecordResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, jsonPopulateRecordParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external jsonPopulateRecord: IR.t => PreparedStatement.t<jsonPopulateRecordParams, jsonPopulateRecordResult> = "PreparedQuery";
  let query = jsonPopulateRecord(jsonPopulateRecordIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}


@gentype
type jsonPopulateRecordset_booksInputType = {
  author_id?: int,
  categories?: categoryArray,
  id?: int,
  name?: string,
  rank?: int,
}


/** 'JsonPopulateRecordset' parameters type */
@gentype
type jsonPopulateRecordsetParams = {
  books: array<jsonPopulateRecordset_booksInputType>,
}

/** 'JsonPopulateRecordset' return type */
@gentype
type jsonPopulateRecordsetResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: int,
  name: option<string>,
  rank: option<int>,
}

/** 'JsonPopulateRecordset' query type */
@gentype
type jsonPopulateRecordsetQuery = {
  params: jsonPopulateRecordsetParams,
  result: jsonPopulateRecordsetResult,
}

%%private(let jsonPopulateRecordsetIR: IR.t = %raw(`{"queryName":"JsonPopulateRecordset","inputParamTransforms":{"1":{"type":"stringify"}},"usedParamSet":{"books":true},"params":[{"name":"books","required":true,"transform":{"type":"scalar"},"locs":[{"a":223,"b":229}]}],"statement":"insert into books (\n    name, \n    author_id, \n    categories, \n    rank\n  )\n    select\n      event.name,\n      event.author_id,\n      event.categories,\n      event.rank\n  from json_populate_recordset(\n    null::books,\n    :books!\n  ) as event\n  on conflict (id) do update set \n    name = excluded.name,\n    author_id = excluded.author_id,\n    categories = excluded.categories,\n    rank = excluded.rank\n  returning *"}`))

/**
 Runnable query:
 ```sql
insert into books (
    name, 
    author_id, 
    categories, 
    rank
  )
    select
      event.name,
      event.author_id,
      event.categories,
      event.rank
  from json_populate_recordset(
    null::books,
    $1
  ) as event
  on conflict (id) do update set 
    name = excluded.name,
    author_id = excluded.author_id,
    categories = excluded.categories,
    rank = excluded.rank
  returning *
 ```

 */
@gentype
module JsonPopulateRecordset: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, jsonPopulateRecordsetParams) => promise<array<jsonPopulateRecordsetResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, jsonPopulateRecordsetParams) => promise<option<jsonPopulateRecordsetResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    jsonPopulateRecordsetParams,
    ~errorMessage: string=?
  ) => promise<jsonPopulateRecordsetResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, jsonPopulateRecordsetParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external jsonPopulateRecordset: IR.t => PreparedStatement.t<jsonPopulateRecordsetParams, jsonPopulateRecordsetResult> = "PreparedQuery";
  let query = jsonPopulateRecordset(jsonPopulateRecordsetIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}



/** 'JsonPopulateRecordsetJsonCast' parameters type */
@gentype
type jsonPopulateRecordsetJsonCastParams = {
  books: JSON.t,
}

/** 'JsonPopulateRecordsetJsonCast' return type */
@gentype
type jsonPopulateRecordsetJsonCastResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: int,
  name: option<string>,
  rank: option<int>,
}

/** 'JsonPopulateRecordsetJsonCast' query type */
@gentype
type jsonPopulateRecordsetJsonCastQuery = {
  params: jsonPopulateRecordsetJsonCastParams,
  result: jsonPopulateRecordsetJsonCastResult,
}

%%private(let jsonPopulateRecordsetJsonCastIR: IR.t = %raw(`{"queryName":"JsonPopulateRecordsetJsonCast","usedParamSet":{"books":true},"params":[{"name":"books","required":true,"transform":{"type":"scalar"},"locs":[{"a":223,"b":229}]}],"statement":"insert into books (\n    name, \n    author_id, \n    categories, \n    rank\n  )\n    select\n      event.name,\n      event.author_id,\n      event.categories,\n      event.rank\n  from json_populate_recordset(\n    null::books,\n    :books!::json\n  ) as event\n  on conflict (id) do update set \n    name = excluded.name,\n    author_id = excluded.author_id,\n    categories = excluded.categories,\n    rank = excluded.rank\n  returning *"}`))

/**
 Runnable query:
 ```sql
insert into books (
    name, 
    author_id, 
    categories, 
    rank
  )
    select
      event.name,
      event.author_id,
      event.categories,
      event.rank
  from json_populate_recordset(
    null::books,
    $1::json
  ) as event
  on conflict (id) do update set 
    name = excluded.name,
    author_id = excluded.author_id,
    categories = excluded.categories,
    rank = excluded.rank
  returning *
 ```

 */
@gentype
module JsonPopulateRecordsetJsonCast: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, jsonPopulateRecordsetJsonCastParams) => promise<array<jsonPopulateRecordsetJsonCastResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, jsonPopulateRecordsetJsonCastParams) => promise<option<jsonPopulateRecordsetJsonCastResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    jsonPopulateRecordsetJsonCastParams,
    ~errorMessage: string=?
  ) => promise<jsonPopulateRecordsetJsonCastResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, jsonPopulateRecordsetJsonCastParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external jsonPopulateRecordsetJsonCast: IR.t => PreparedStatement.t<jsonPopulateRecordsetJsonCastParams, jsonPopulateRecordsetJsonCastResult> = "PreparedQuery";
  let query = jsonPopulateRecordsetJsonCast(jsonPopulateRecordsetJsonCastIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}


@gentype
type jsonbPopulateRecord_booksInputType = {
  author_id?: int,
  categories?: categoryArray,
  id?: int,
  name?: string,
  rank?: int,
}


/** 'JsonbPopulateRecord' parameters type */
@gentype
type jsonbPopulateRecordParams = {
  book: jsonbPopulateRecord_booksInputType,
}

/** 'JsonbPopulateRecord' return type */
@gentype
type jsonbPopulateRecordResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: option<int>,
  name: option<string>,
  rank: option<int>,
}

/** 'JsonbPopulateRecord' query type */
@gentype
type jsonbPopulateRecordQuery = {
  params: jsonbPopulateRecordParams,
  result: jsonbPopulateRecordResult,
}

%%private(let jsonbPopulateRecordIR: IR.t = %raw(`{"queryName":"JsonbPopulateRecord","inputParamTransforms":{"1":{"type":"stringify"}},"usedParamSet":{"book":true},"params":[{"name":"book","required":true,"transform":{"type":"scalar"},"locs":[{"a":58,"b":63}]}],"statement":"SELECT * FROM jsonb_populate_record(\n    null::books,\n    :book!\n  )"}`))

/**
 Runnable query:
 ```sql
SELECT * FROM jsonb_populate_record(
    null::books,
    $1
  )
 ```

 */
@gentype
module JsonbPopulateRecord: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, jsonbPopulateRecordParams) => promise<array<jsonbPopulateRecordResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, jsonbPopulateRecordParams) => promise<option<jsonbPopulateRecordResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    jsonbPopulateRecordParams,
    ~errorMessage: string=?
  ) => promise<jsonbPopulateRecordResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, jsonbPopulateRecordParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external jsonbPopulateRecord: IR.t => PreparedStatement.t<jsonbPopulateRecordParams, jsonbPopulateRecordResult> = "PreparedQuery";
  let query = jsonbPopulateRecord(jsonbPopulateRecordIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}


@gentype
type jsonbPopulateRecordset_booksInputType = {
  author_id?: int,
  categories?: categoryArray,
  id?: int,
  name?: string,
  rank?: int,
}


/** 'JsonbPopulateRecordset' parameters type */
@gentype
type jsonbPopulateRecordsetParams = {
  books: array<jsonbPopulateRecordset_booksInputType>,
}

/** 'JsonbPopulateRecordset' return type */
@gentype
type jsonbPopulateRecordsetResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: option<int>,
  name: option<string>,
  rank: option<int>,
}

/** 'JsonbPopulateRecordset' query type */
@gentype
type jsonbPopulateRecordsetQuery = {
  params: jsonbPopulateRecordsetParams,
  result: jsonbPopulateRecordsetResult,
}

%%private(let jsonbPopulateRecordsetIR: IR.t = %raw(`{"queryName":"JsonbPopulateRecordset","inputParamTransforms":{"1":{"type":"stringify"}},"usedParamSet":{"books":true},"params":[{"name":"books","required":true,"transform":{"type":"scalar"},"locs":[{"a":61,"b":67}]}],"statement":"SELECT * FROM jsonb_populate_recordset(\n    null::books,\n    :books!\n  )"}`))

/**
 Runnable query:
 ```sql
SELECT * FROM jsonb_populate_recordset(
    null::books,
    $1
  )
 ```

 */
@gentype
module JsonbPopulateRecordset: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, jsonbPopulateRecordsetParams) => promise<array<jsonbPopulateRecordsetResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, jsonbPopulateRecordsetParams) => promise<option<jsonbPopulateRecordsetResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    jsonbPopulateRecordsetParams,
    ~errorMessage: string=?
  ) => promise<jsonbPopulateRecordsetResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, jsonbPopulateRecordsetParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external jsonbPopulateRecordset: IR.t => PreparedStatement.t<jsonbPopulateRecordsetParams, jsonbPopulateRecordsetResult> = "PreparedQuery";
  let query = jsonbPopulateRecordset(jsonbPopulateRecordsetIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}


