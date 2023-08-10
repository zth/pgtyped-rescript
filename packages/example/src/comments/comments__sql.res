/** Types generated for queries found in "src/comments/comments.sql" */
open PgTyped


/** 'GetAllComments' parameters type */
type getAllCommentsParams = {
  id: int,
}

/** 'GetAllComments' return type */
type getAllCommentsResult = {
  body: Null.t<string>,
  book_id: Null.t<int>,
  id: int,
  user_id: Null.t<int>,
}

/** 'GetAllComments' query type */
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
@module("@pgtyped/runtime") @new external getAllComments: IR.t => PreparedStatement.t<getAllCommentsParams, getAllCommentsResult> = "PreparedQuery";
let getAllComments = getAllComments(getAllCommentsIR)
let getAllComments = (params, ~client) => getAllComments->PreparedStatement.run(params, ~client)


/** 'GetAllCommentsByIds' parameters type */
type getAllCommentsByIdsParams = {
  ids: array<int>,
}

/** 'GetAllCommentsByIds' return type */
type getAllCommentsByIdsResult = {
  body: Null.t<string>,
  book_id: Null.t<int>,
  id: int,
  user_id: Null.t<int>,
}

/** 'GetAllCommentsByIds' query type */
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
@module("@pgtyped/runtime") @new external getAllCommentsByIds: IR.t => PreparedStatement.t<getAllCommentsByIdsParams, getAllCommentsByIdsResult> = "PreparedQuery";
let getAllCommentsByIds = getAllCommentsByIds(getAllCommentsByIdsIR)
let getAllCommentsByIds = (params, ~client) => getAllCommentsByIds->PreparedStatement.run(params, ~client)


type insertCommentParams_comments = {
  userId: int,
  commentBody: string
}
/** 'InsertComment' parameters type */
type insertCommentParams = {
  comments: array<insertCommentParams_comments>,
}

/** 'InsertComment' return type */
type insertCommentResult = {
  body: Null.t<string>,
  book_id: Null.t<int>,
  id: int,
  user_id: Null.t<int>,
}

/** 'InsertComment' query type */
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
@module("@pgtyped/runtime") @new external insertComment: IR.t => PreparedStatement.t<insertCommentParams, insertCommentResult> = "PreparedQuery";
let insertComment = insertComment(insertCommentIR)
let insertComment = (params, ~client) => insertComment->PreparedStatement.run(params, ~client)


/** 'SelectExistsTest' parameters type */
type selectExistsTestParams = unit

/** 'SelectExistsTest' return type */
type selectExistsTestResult = {
  isTransactionExists: Null.t<bool>,
}

/** 'SelectExistsTest' query type */
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
@module("@pgtyped/runtime") @new external selectExistsTest: IR.t => PreparedStatement.t<selectExistsTestParams, selectExistsTestResult> = "PreparedQuery";
let selectExistsTest = selectExistsTest(selectExistsTestIR)
let selectExistsTest = (params, ~client) => selectExistsTest->PreparedStatement.run(params, ~client)


