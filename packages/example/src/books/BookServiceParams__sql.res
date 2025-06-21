/** Types generated for queries found in "src/books/BookServiceParams.res" */
open PgTyped


@gentype
type notification_type = [#"deadline" | #"notification" | #"reminder"]

@gentype
type query1Params_notification = {
  payload?: JSON.t,
  user_id?: int,
  @as("type") type_?: notification_type
}
/** 'Query1' parameters type */
@gentype
type query1Params = {
  notification: query1Params_notification,
}

/** 'Query1' return type */
@gentype
type query1Result = unit

/** 'Query1' query type */
@gentype
type query1Query = {
  params: query1Params,
  result: query1Result,
}

%%private(let query1IR: IR.t = %raw(`{"queryName":"Query1","usedParamSet":{"notification":true},"params":[{"name":"notification","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"payload","required":false},{"name":"user_id","required":false},{"name":"type","required":false}]},"locs":[{"a":58,"b":70}]}],"statement":"INSERT INTO notifications (payload, user_id, type) VALUES :notification"}`))

/**
 Runnable query:
 ```sql
INSERT INTO notifications (payload, user_id, type) VALUES ($1,$2,$3)
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
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    query1Params,
    ~errorMessage: string=?
  ) => promise<query1Result>

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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'Query1.many' directly instead")
let query1 = (params, ~client) => Query1.many(client, params)


