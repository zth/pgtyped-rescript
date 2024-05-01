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
 Runnable query:
 ```sql
INSERT INTO notifications (user_id, payload, type)
VALUES ($1,$2,$3) RETURNING id as notification_id
 ```

 */
@gentype
module SendNotifications: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, sendNotificationsParams) => promise<array<sendNotificationsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, sendNotificationsParams) => promise<option<sendNotificationsResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    sendNotificationsParams,
    ~errorMessage: string=?
  ) => promise<result<sendNotificationsResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, sendNotificationsParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external sendNotifications: IR.t => PreparedStatement.t<sendNotificationsParams, sendNotificationsResult> = "PreparedQuery";
  let query = sendNotifications(sendNotificationsIR)
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
@deprecated("Use 'SendNotifications.many' directly instead")
let sendNotifications = (params, ~client) => SendNotifications.many(client, params)


/** 'GetNotifications' parameters type */
@gentype
type getNotificationsParams = {
  date: dateOrString,
  userId?: int,
}

/** 'GetNotifications' return type */
@gentype
type getNotificationsResult = {
  created_at: string,
  id: int,
  payload: JSON.t,
  @as("type") type_: notification_type,
  user_id: option<int>,
}

/** 'GetNotifications' query type */
@gentype
type getNotificationsQuery = {
  params: getNotificationsParams,
  result: getNotificationsResult,
}

%%private(let getNotificationsIR: IR.t = %raw(`{"usedParamSet":{"userId":true,"date":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":53}]},{"name":"date","required":true,"transform":{"type":"scalar"},"locs":[{"a":73,"b":78}]}],"statement":"SELECT *\n  FROM notifications\n WHERE user_id = :userId\n AND created_at > :date!"}`))

/**
 Runnable query:
 ```sql
SELECT *
  FROM notifications
 WHERE user_id = $1
 AND created_at > $2
 ```

 */
@gentype
module GetNotifications: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, getNotificationsParams) => promise<array<getNotificationsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, getNotificationsParams) => promise<option<getNotificationsResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    getNotificationsParams,
    ~errorMessage: string=?
  ) => promise<result<getNotificationsResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, getNotificationsParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external getNotifications: IR.t => PreparedStatement.t<getNotificationsParams, getNotificationsResult> = "PreparedQuery";
  let query = getNotifications(getNotificationsIR)
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
@deprecated("Use 'GetNotifications.many' directly instead")
let getNotifications = (params, ~client) => GetNotifications.many(client, params)


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
 Runnable query:
 ```sql
SELECT u.user_name, n.payload, n.type
FROM notifications n
INNER JOIN users u on n.user_id = u.id
WHERE CAST (n.payload->'num_frogs' AS int) > $1
 ```

 */
@gentype
module ThresholdFrogs: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, thresholdFrogsParams) => promise<array<thresholdFrogsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, thresholdFrogsParams) => promise<option<thresholdFrogsResult>>
  
  /** Returns exactly 1 result. Returns `Error` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    thresholdFrogsParams,
    ~errorMessage: string=?
  ) => promise<result<thresholdFrogsResult, string>>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, thresholdFrogsParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external thresholdFrogs: IR.t => PreparedStatement.t<thresholdFrogsParams, thresholdFrogsResult> = "PreparedQuery";
  let query = thresholdFrogs(thresholdFrogsIR)
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
@deprecated("Use 'ThresholdFrogs.many' directly instead")
let thresholdFrogs = (params, ~client) => ThresholdFrogs.many(client, params)


