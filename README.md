<img width="340" height="150" align="right" src="https://raw.githubusercontent.com/adelsz/pgtyped/master/header.png">

# [PgTyped](https://pgtyped.dev/)

![Version](https://img.shields.io/github/v/release/adelsz/pgtyped)
[![Actions Status](https://github.com/adelsz/pgtyped/workflows/CI/badge.svg)](https://github.com/adelsz/pgtyped/actions) [![Join the chat at https://gitter.im/pgtyped/community](https://badges.gitter.im/pgtyped/community.svg)](https://gitter.im/pgtyped/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## ReScript fork of PgTyped

> This is a fork PgTyped that outputs ReScript instead of TS. Most things work the same as the TS version. [Here's a dedicated ReScript readme](./RESCRIPT.md) detailing the differences, and how to get started in ReScript.

PgTyped makes it possible to use raw SQL in TypeScript with guaranteed type-safety.  
No need to map or translate your DB schema to TypeScript, PgTyped automatically generates types and interfaces for your SQL queries by using your running Postgres database as the source of type information.

---

## Features:

1. Automatically generates TS types for parameters/results of SQL queries of any complexity.
2. Supports extracting and typing queries from both SQL and TS files.
3. Generate query types as you write them, using watch mode.
4. Useful parameter interpolation helpers for arrays and objects.
5. No need to define your DB schema in TypeScript, your running DB is the live source of type data.
6. Prevents SQL injections by not doing explicit parameter substitution. Instead, queries and parameters are sent separately to the DB driver, allowing parameter substitution to be safely done by the PostgreSQL server.
7. Native ESM support. Runtime dependencies are also provided as CommonJS.

### Documentation

Visit our documentation page at [https://pgtyped.dev/](https://pgtyped.dev/)

### Getting started

1. `npm install -D pgtyped-rescript rescript`
2. `npm install pgtyped-rescript-runtime pgtyped-rescript-query`
3. Create a PgTyped `config.json` file.
4. Run `npx pgtyped-rescript -w -c config.json` to start PgTyped in watch mode.

More info on getting started can be found in the [Getting Started](https://pgtyped.dev/docs/getting-started) page.
You can also refer to the [example app](./packages/example/README.md) for a preconfigured example.

### Example

Lets save some queries in `books.sql`:

```sql
/* @name FindBookById */
SELECT * FROM books WHERE id = :bookId;
```

PgTyped parses the SQL file, extracting all queries and generating strictly typed ReScript bindings in `books__sql.res`:

```rescript
type findBookByIdParams = {
  bookId: option<int>,
}

type findBookByIdResult = {
  id: int,
  rank: option<int>,
  name: option<string>,
  author_id: option<int>,
}

module FindBookById = {
  let many: (PgTyped.Pg.Client.t, findBookByIdParams) => promise<array<findBookByIdResult>>
}
```

Query `FindBookById.many` is now statically typed, with types inferred from the PostgreSQL schema.
This generated query can be imported and executed as follows:

```rescript
open PgTyped

let client = Pg.Client.make(Config({
  host: "localhost",
  user: "test",
  password: "example",
  database: "test",
}))

let main = async () => {
  await client->Pg.Client.connect
  let books = await Books__sql.FindBookById.many(client, {bookId: Some(5)})
  Js.log2("Book name:", books[0].name)
  await client->Pg.Client.end
}
```

### Resources

1. [Configuring pgTyped](https://pgtyped.dev/docs/cli)
2. [Writing queries in SQL files](https://pgtyped.dev/docs/sql-file-intro)
3. [Advanced queries and parameter expansions in SQL files](https://pgtyped.dev/docs/sql-file)

### Project state:

This project is being actively developed and its APIs might change.
All issue reports, feature requests and PRs appreciated.

### License

[MIT](https://github.com/adelsz/pgtyped/tree/master/LICENSE)

Copyright (c) 2019-present, Adel Salakh
