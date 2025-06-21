module Pg = {
  // TODO: Improve safety of this?
  type pgValue
  external toPgValue: 'any => pgValue = "%identity"

  module PgResult = {
    type fieldInfo = {
      name: string,
      dataTypeID: int,
    }

    type t<'row> = {
      rows: array<'row>,
      fields: array<fieldInfo>,
      command: string,
      rowCount: Js.Null.t<float>,
    }
  }

  module Client = {
    type t

    type config = {
      /** default process.env.PGUSER || process.env.USER*/ user?: string,
      /**default process.env.PGPASSWORD*/ password?: string,
      /** default process.env.PGHOST*/ host?: string,
      /** default process.env.PGPORT*/ port?: int,
      /** default process.env.PGDATABASE || user*/ database?: string,
      /** e.g. postgres://user:password@host:5432/database*/ connectionString?: string,
      /** passed directly to node.TLSSocket, supports all tls.connect options*/ ssl?: unknown,
      /** custom type parsers*/ types?: unknown,
      /** number of milliseconds before a statement in query will time out, default is no timeout*/
      statement_timeout?: float,
      /** number of milliseconds before a query call will timeout, default is no timeout*/
      query_timeout?: float,
      /** number of milliseconds a query is allowed to be en lock state before it's cancelled due to lock timeout*/
      lock_timeout?: float,
      /** The name of the application that created this Client instance*/ application_name?: string,
      /** number of milliseconds to wait for connection, default is no timeout*/
      connectionTimeoutMillis?: float,
      /** number of milliseconds before terminating any session with an open idle transaction, default is no timeout*/
      idle_in_transaction_session_timeout?: float,
    }

    @unboxed
    type pgConfig = Config(config) | ConnectionString(string)

    @module("pg") @new external make: pgConfig => t = "Client"
    @send external connect: t => promise<unit> = "connect"
    @send external end: t => promise<unit> = "end"
    @send external release: t => promise<unit> = "release"

    /** Bind when needed. */
    type typeParsers

    type queryConfig = {
      /** the raw query text*/
      text: string,
      /** an array of query parameters*/
      values?: array<pgValue>,
      /** name of the query - used for prepared statements*/
      name?: string,
      /** by default rows come out as a key/value pair for each row*/
      /** pass the string 'array' here to receive rows as an array of values*/
      rowMode?: [#array],
      /** custom type parsers just for this query result*/
      types?: typeParsers,
      /** TODO: document*/
      queryMode?: string,
    }

    @send external queryWithConfig: (t, queryConfig) => promise<PgResult.t<'result>> = "query"

    @send
    external query: (t, string, ~values: array<pgValue>=?) => promise<PgResult.t<'result>> = "query"

    // TODO: Events
  }

  module Pool = {
    type t

    type config = {
      /** all valid client config options are also valid here
   in addition here are the pool specific configuration parameters:
 
   number of milliseconds to wait before timing out when connecting a new client
   by default this is 0 which means no timeout*/
      connectionTimeoutMillis?: float,
      /** number of milliseconds a client must sit idle in the pool and not be checked out
 before it is disconnected from the backend and discarded
   default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients*/
      idleTimeoutMillis?: float,
      /** maximum number of clients the pool should contain
   by default this is set to 10.*/
      max?: int,
      /**Default behavior is the pool will keep clients open & connected to the backend
  until idleTimeoutMillis expire for each client and node will maintain a ref
  to the socket on the client, keeping the event loop alive until all clients are closed
  after being idle or the pool is manually shutdown with `pool.end()`.
    Setting `allowExitOnIdle: true` in the config will allow the node event loop to exit
  as soon as all clients in the pool are idle, even if their socket is still open
  to the postgres server.  This can be handy in scripts & tests
  where you don't want to wait for your clients to go idle before your process exits.*/
      allowExitOnIdle?: bool,
    }

    @unboxed
    type pgConfig = Config(config) | ConnectionString(string)

    @module("pg") @new external make: pgConfig => t = "Pool"

    @send
    external query: (t, string, ~values: array<pgValue>=?) => promise<PgResult.t<'result>> = "query"
    @send external connect: t => promise<Client.t> = "connect"
    @send external end: t => promise<unit> = "end"

    @get external totalCount: t => int = "totalCount"
    @get external idleCount: t => int = "idleCount"
    @get external waitingCount: t => int = "waitingCount"

    // TODO: Events
  }
}

module IR = {
  type t = private {
    queryName: option<string>,
    statement: string,
    usedParamSet: dict<bool>,
    params: array<Js.Json.t>, // This can be more thoroughly typed if wanted
  }
}

module PreparedStatement = {
  type t<'params, 'result>

  @send
  external run: (t<'params, 'result>, 'params, ~client: Pg.Client.t) => promise<array<'result>> =
    "run"
}

type dateOrString = string
