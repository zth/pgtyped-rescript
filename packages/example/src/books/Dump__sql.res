/** Types generated for queries found in "src/books/Dump.res" */
open PgTyped


@gentype
type arrayJSON_t = array<JSON.t>

/** 'Dump' parameters type */
@gentype
type dumpParams = unit

/** 'Dump' return type */
@gentype
type dumpResult = {
  availability: option<string>,
  big_int: option<bigint>,
  binding_type: option<[#"Hardcover" | #"Paperback" | #"SPIRAL" | #"loose-leaf"]>,
  discount_rate: option<float>,
  edition: option<int>,
  format: option<[#"hardcover" | #"paperback" | #"ebook" | #"audiobook"]>,
  id: int,
  is_featured: option<bool>,
  isbn: option<string>,
  json_test: option<JSON.t>,
  language: option<[#"en" | #"es" | #"fr" | #"de"]>,
  meta: option<arrayJSON_t>,
  page_count: option<[#100 | #200 | #300 | #400 | #500]>,
  price: option<string>,
  priority: option<[#1 | #2 | #3 | #4 | #5]>,
  publication_year: option<int>,
  rating: option<float>,
  some_float_enum: option<float>,
  some_int_enum: option<[#1 | #2 | #3 | #4]>,
  some_string_enum: option<[#"FIRST" | #"second" | #"Third" | #"fourth"]>,
  status: option<[#"published" | #"draft" | #"archived"]>,
  weight_kg: option<float>,
}

/** 'Dump' query type */
@gentype
type dumpQuery = {
  params: dumpParams,
  result: dumpResult,
}

%%private(let dumpIR: IR.t = %raw(`{"queryName":"Dump","usedParamSet":{},"params":[],"statement":"SELECT * FROM dump LIMIT 1"}`))

/**
 Runnable query:
 ```sql
SELECT * FROM dump LIMIT 1
 ```

 */
@gentype
module Dump: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, dumpParams) => promise<array<dumpResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, dumpParams) => promise<option<dumpResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    dumpParams,
    ~errorMessage: string=?
  ) => promise<dumpResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, dumpParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external dump: IR.t => PreparedStatement.t<dumpParams, dumpResult> = "PreparedQuery";
  let query = dump(dumpIR)
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
@deprecated("Use 'Dump.many' directly instead")
let dump = (params, ~client) => Dump.many(client, params)


