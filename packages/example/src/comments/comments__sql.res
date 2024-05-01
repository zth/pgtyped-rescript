/** Types generated for queries found in "src/comments/comments.sql" */
open PgTyped


/** 'GetAllComments' parameters type */
@gentype
type getAllCommentsParams = {
  id: int,
}

/** 'GetAllComments' return type */
@gentype
type getAllCommentsResult = {
  body: option<string>,
  book_id: option<int>,
  id: int,
  user_id: option<int>,
}

/** 'GetAllComments' query type */
@gentype
type getAllCommentsQuery = {
  params: getAllCommentsParams,
  result: getAllCommentsResult,
}

%%private(let getAllCommentsIR: IR.t = %raw(`{"usedParamSet":{"id":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":39,"b":42},{"a":57,"b":59}]}],"statement":"SELECT * FROM book_comments WHERE id = :id! OR user_id = :id                                      "}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM book_comments WHERE id = :id! OR user_id = :id                                      
 * ```
 */
@gentype
module GetAllComments: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, getAllCommentsParams) => promise<array<getAllCommentsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, getAllCommentsParams) => promise<option<getAllCommentsResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    getAllCommentsParams,
    ~errorMessage: string=?
  ) => promise<result<getAllCommentsResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, getAllCommentsParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external getAllComments: IR.t => PreparedStatement.t<getAllCommentsParams, getAllCommentsResult> = "PreparedQuery";
  let query = getAllComments(getAllCommentsIR)
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
@deprecated("Use 'GetAllComments.many' directly instead")
let getAllComments = (params, ~client) => GetAllComments.many(client, params)


/** 'GetAllCommentsByIds' parameters type */
@gentype
type getAllCommentsByIdsParams = {
  ids: array<int>,
}

/** 'GetAllCommentsByIds' return type */
@gentype
type getAllCommentsByIdsResult = {
  body: option<string>,
  book_id: option<int>,
  id: int,
  user_id: option<int>,
}

/** 'GetAllCommentsByIds' query type */
@gentype
type getAllCommentsByIdsQuery = {
  params: getAllCommentsByIdsParams,
  result: getAllCommentsByIdsResult,
}

%%private(let getAllCommentsByIdsIR: IR.t = %raw(`{"usedParamSet":{"ids":true},"params":[{"name":"ids","required":true,"transform":{"type":"array_spread"},"locs":[{"a":40,"b":43},{"a":55,"b":59}]}],"statement":"SELECT * FROM book_comments WHERE id in :ids AND id in :ids!"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM book_comments WHERE id in :ids AND id in :ids!
 * ```
 */
@gentype
module GetAllCommentsByIds: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, getAllCommentsByIdsParams) => promise<array<getAllCommentsByIdsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, getAllCommentsByIdsParams) => promise<option<getAllCommentsByIdsResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    getAllCommentsByIdsParams,
    ~errorMessage: string=?
  ) => promise<result<getAllCommentsByIdsResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, getAllCommentsByIdsParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external getAllCommentsByIds: IR.t => PreparedStatement.t<getAllCommentsByIdsParams, getAllCommentsByIdsResult> = "PreparedQuery";
  let query = getAllCommentsByIds(getAllCommentsByIdsIR)
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
@deprecated("Use 'GetAllCommentsByIds.many' directly instead")
let getAllCommentsByIds = (params, ~client) => GetAllCommentsByIds.many(client, params)


@gentype
type insertCommentParams_comments = {
  userId: int,
  commentBody: string
}
/** 'InsertComment' parameters type */
@gentype
type insertCommentParams = {
  comments: array<insertCommentParams_comments>,
}

/** 'InsertComment' return type */
@gentype
type insertCommentResult = {
  body: option<string>,
  book_id: option<int>,
  id: int,
  user_id: option<int>,
}

/** 'InsertComment' query type */
@gentype
type insertCommentQuery = {
  params: insertCommentParams,
  result: insertCommentResult,
}

%%private(let insertCommentIR: IR.t = %raw(`{"usedParamSet":{"comments":true},"params":[{"name":"comments","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"userId","required":true},{"name":"commentBody","required":true}]},"locs":[{"a":73,"b":81}]}],"statement":"INSERT INTO book_comments (user_id, body)\n-- NOTE: this is a note\nVALUES :comments RETURNING *"}`))

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO book_comments (user_id, body)
 * -- NOTE: this is a note
 * VALUES :comments RETURNING *
 * ```
 */
@gentype
module InsertComment: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, insertCommentParams) => promise<array<insertCommentResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, insertCommentParams) => promise<option<insertCommentResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    insertCommentParams,
    ~errorMessage: string=?
  ) => promise<result<insertCommentResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, insertCommentParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external insertComment: IR.t => PreparedStatement.t<insertCommentParams, insertCommentResult> = "PreparedQuery";
  let query = insertComment(insertCommentIR)
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
@deprecated("Use 'InsertComment.many' directly instead")
let insertComment = (params, ~client) => InsertComment.many(client, params)


/** 'SelectExistsTest' parameters type */
@gentype
type selectExistsTestParams = unit

/** 'SelectExistsTest' return type */
@gentype
type selectExistsTestResult = {
  isTransactionExists: option<bool>,
}

/** 'SelectExistsTest' query type */
@gentype
type selectExistsTestQuery = {
  params: selectExistsTestParams,
  result: selectExistsTestResult,
}

%%private(let selectExistsTestIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT EXISTS ( SELECT 1 WHERE true ) AS \"isTransactionExists\""}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT EXISTS ( SELECT 1 WHERE true ) AS "isTransactionExists"
 * ```
 */
@gentype
module SelectExistsTest: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, selectExistsTestParams) => promise<array<selectExistsTestResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, selectExistsTestParams) => promise<option<selectExistsTestResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    selectExistsTestParams,
    ~errorMessage: string=?
  ) => promise<result<selectExistsTestResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, selectExistsTestParams) => promise<unit>
} = {
  @module("@pgtyped/runtime") @new external selectExistsTest: IR.t => PreparedStatement.t<selectExistsTestParams, selectExistsTestResult> = "PreparedQuery";
  let query = selectExistsTest(selectExistsTestIR)
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
@deprecated("Use 'SelectExistsTest.many' directly instead")
let selectExistsTest = (params, ~client) => SelectExistsTest.many(client, params)


