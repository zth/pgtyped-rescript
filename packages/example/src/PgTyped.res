module Pg = {
  module Client = {
    type t

    type config = {
      host: string,
      user: string,
      password: string,
      database: string,
      port?: int,
    }

    @module("pg") @new external make: config => t = "Client"
    @send external connect: t => promise<unit> = "connect"
    @send external end: t => promise<unit> = "end"
    @send external query: (t, string) => promise<unknown> = "query"
  }
}

module IR = {
  type t
}

module PreparedStatement = {
  type t<'params, 'result>

  @send
  external run: (t<'params, 'result>, 'params, ~client: Pg.Client.t) => promise<array<'result>> =
    "run"
}

type dateOrString = string
