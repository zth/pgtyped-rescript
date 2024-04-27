/** Types generated for queries found in "src/notifications/notifications.sql" */
open PgTyped


@gentype
type notification_type = [#"deadline" | #"notification" | #"reminder"]

@gentype
type sendNotificationsParams_notifications = {
  user_id: int,
  payload: JSON.t,
  @as("type") type_: notification_type
}
/** 'SendNotifications' parameters type */
@gentype
type sendNotificationsParams = {
  notifications: array<sendNotificationsParams_notifications>,
}

/** 'SendNotifications' return type */
@gentype
type sendNotificationsResult = {
  notification_id: int,
}

/** 'SendNotifications' query type */
@gentype
type sendNotificationsQuery = {
  params: sendNotificationsParams,
  result: sendNotificationsResult,
}

%%private(let sendNotificationsIR: IR.t = %raw(`{"usedParamSet":{"notifications":true},"params":[{"name":"notifications","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"user_id","required":true},{"name":"payload","required":true},{"name":"type","required":true}]},"locs":[{"a":58,"b":71}]}],"statement":"INSERT INTO notifications (user_id, payload, type)\nVALUES :notifications RETURNING id as notification_id"}`))

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO notifications (user_id, payload, type)
 * VALUES :notifications RETURNING id as notification_id
 * ```
 */
@module("@pgtyped/runtime") @new external sendNotifications: IR.t => PreparedStatement.t<sendNotificationsParams, sendNotificationsResult> = "PreparedQuery";
let sendNotifications = sendNotifications(sendNotificationsIR)

@gentype
let sendNotifications = (params, ~client) => sendNotifications->PreparedStatement.run(params, ~client)


/** 'GetNotifications' parameters type */
@gentype
type getNotificationsParams = {
  date: dateOrString,
  userId?: Null.t<int>,
}

/** 'GetNotifications' return type */
@gentype
type getNotificationsResult = {
  created_at: string,
  id: int,
  payload: JSON.t,
  @as("type") type_: notification_type,
  user_id: Null.t<int>,
}

/** 'GetNotifications' query type */
@gentype
type getNotificationsQuery = {
  params: getNotificationsParams,
  result: getNotificationsResult,
}

%%private(let getNotificationsIR: IR.t = %raw(`{"usedParamSet":{"userId":true,"date":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":53}]},{"name":"date","required":true,"transform":{"type":"scalar"},"locs":[{"a":73,"b":78}]}],"statement":"SELECT *\n  FROM notifications\n WHERE user_id = :userId\n AND created_at > :date!"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 *   FROM notifications
 *  WHERE user_id = :userId
 *  AND created_at > :date!
 * ```
 */
@module("@pgtyped/runtime") @new external getNotifications: IR.t => PreparedStatement.t<getNotificationsParams, getNotificationsResult> = "PreparedQuery";
let getNotifications = getNotifications(getNotificationsIR)

@gentype
let getNotifications = (params, ~client) => getNotifications->PreparedStatement.run(params, ~client)


/** 'ThresholdFrogs' parameters type */
@gentype
type thresholdFrogsParams = {
  numFrogs: int,
}

/** 'ThresholdFrogs' return type */
@gentype
type thresholdFrogsResult = {
  payload: JSON.t,
  @as("type") type_: notification_type,
  user_name: string,
}

/** 'ThresholdFrogs' query type */
@gentype
type thresholdFrogsQuery = {
  params: thresholdFrogsParams,
  result: thresholdFrogsResult,
}

%%private(let thresholdFrogsIR: IR.t = %raw(`{"usedParamSet":{"numFrogs":true},"params":[{"name":"numFrogs","required":true,"transform":{"type":"scalar"},"locs":[{"a":143,"b":152}]}],"statement":"SELECT u.user_name, n.payload, n.type\nFROM notifications n\nINNER JOIN users u on n.user_id = u.id\nWHERE CAST (n.payload->'num_frogs' AS int) > :numFrogs!"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT u.user_name, n.payload, n.type
 * FROM notifications n
 * INNER JOIN users u on n.user_id = u.id
 * WHERE CAST (n.payload->'num_frogs' AS int) > :numFrogs!
 * ```
 */
@module("@pgtyped/runtime") @new external thresholdFrogs: IR.t => PreparedStatement.t<thresholdFrogsParams, thresholdFrogsResult> = "PreparedQuery";
let thresholdFrogs = thresholdFrogs(thresholdFrogsIR)

@gentype
let thresholdFrogs = (params, ~client) => thresholdFrogs->PreparedStatement.run(params, ~client)


