/** Types generated for queries found in "src/books/Keywords.res" */
open PgTyped


/** 'Keywords' parameters type */
@gentype
type keywordsParams = unit

/** 'Keywords' return type */
@gentype
type keywordsResult = {
  @as("assert") assert_: option<string>,
  @as("await") await_: option<string>,
  @as("exception") exception_: option<string>,
  @as("external") external_: option<string>,
  id: int,
  @as("if") if_: option<string>,
  @as("include") include_: option<string>,
  @as("let") let_: option<string>,
  @as("module") module_: option<string>,
  @as("mutable") mutable_: option<string>,
  @as("of") of_: option<string>,
  @as("open") open_: option<string>,
  @as("private") private_: option<string>,
  @as("rec") rec_: option<string>,
  @as("switch") switch_: option<string>,
  @as("try") try_: option<string>,
  @as("type") type_: option<string>,
  @as("while") while_: option<string>,
}

/** 'Keywords' query type */
@gentype
type keywordsQuery = {
  params: keywordsParams,
  result: keywordsResult,
}

%%private(let keywordsIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"select * from rescript_keywords_need_to_be_escaped"}`))

/**
 Runnable query:
 ```sql
select * from rescript_keywords_need_to_be_escaped
 ```

 */
@gentype
module Keywords: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, keywordsParams) => promise<array<keywordsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, keywordsParams) => promise<option<keywordsResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    keywordsParams,
    ~errorMessage: string=?
  ) => promise<keywordsResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, keywordsParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external keywords: IR.t => PreparedStatement.t<keywordsParams, keywordsResult> = "PreparedQuery";
  let query = keywords(keywordsIR)
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
@deprecated("Use 'Keywords.many' directly instead")
let keywords = (params, ~client) => Keywords.many(client, params)


