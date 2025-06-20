/** Types generated for queries found in "src/books/Json.res" */
open PgTyped


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

%%private(let jsonIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT json_build_object('key', 'value') AS json_object"}`))

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
@deprecated("Use 'Json.many' directly instead")
let json = (params, ~client) => Json.many(client, params)


