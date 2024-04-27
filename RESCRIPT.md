# pgtyped-rescript

This small readme focuses on the differences between regular `pgtyped` and this fork that is compatible with ReScript.

## Differences to regular `pgtyped`

- It outputs ReScript instead of TypeScript.
- It only supports using SQL files, not SQL-in-ReScript (yet! support coming at some point).

Everything else should work pretty much the same as stock `pgtyped`.

## Getting started

Make sure you have ReScript `v11.1`, and [ReScript Core](https://github.com/rescript-association/rescript-core) (plus `RescriptCore` opened globally).

1. `npm install -D pgtyped-rescript`
2. `npm install @pgtyped/runtime pg rescript @rescript/core` (`@pgtyped/runtime` and `pg` are the only required runtime dependencies of pgtyped)
3. Create a PgTyped `pgtyped.config.json` file.
4. Run `npx pgtyped-rescript -w -c pgtyped.config.json` to start PgTyped in watch mode.

### Example of setting up and running `pgtyped-rescript`

Here's a sample `pgtyped.config.json` file:

```json
{
  "transforms": [
    {
      "mode": "sql",
      "include": "**/*.sql",
      "emitTemplate": "{{dir}}/{{name}}__sql.res"
    }
  ],
  "srcDir": "./src/sql",
  "dbUrl": "postgres://pgtyped:pgtyped@localhost/pgtyped"
}
```

> Notice how we're configuring what we want the generated ReScript files to be named under `emitTemplate`.

Please refer to the `pgtyped` docs for all configuration options. The only thing that's important to remember for the ReScript version is that _only SQL files are supported_.

Now we can create a SQL file in `src/sql`. We call this one `books.sql`:

```sql
/* @name findBookById */
SELECT * FROM books WHERE id = :id!;
```

After running `npx pgtyped-rescript -c pgtyped.config.json` we should get a `books__sql.res` file, with a module `FindBookById` with various functions for executing the query. Here's a full example of how we can connect to a database, and use that generated function to query it:

```rescript
open PgTyped

external env: {..} = "process.env"

let dbConfig = {
  Pg.Client.host: env["PGHOST"]->Option.getWithDefault("127.0.0.1"),
  user: env["PGUSER"]->Option.getWithDefault("pgtyped"),
  password: env["PGPASSWORD"]->Option.getWithDefault("pgtyped"),
  database: env["PGDATABASE"]->Option.getWithDefault("pgtyped"),
  port: env["PGPORT"]->Option.flatMap(port => Int.fromString(port))->Option.getWithDefault(5432),
}

let client = Pg.Client.make(dbConfig)

let main = async () => {
  await client->Pg.Client.connect

  let res = await client->Books__sql.FindBookById.one({id: 1})
  Console.log(res)

  await client->Pg.Client.end
}

main()->Promise.done
```

## API

### `PgTyped`

The package comes with minimal bindings to be able to set up a `pg` client. Please feel free to open issues for anything that's missing. It's also easy to add your own bindings locally by using `@send` and binding them to `PgTyped.Pg.Client.t`, like:

```rescript
// Imagine `end` didn't have bindings
@send external end: PgTyped.Pg.Client.t => promise<unit> = "end"

await client->end
```

## Future

Here are a few loose thoughts around what we could do to improve things even more.

### SQL-in-ReScript version

Co-locate SQL directly in ReScript files. This could look something like:

```rescript
let findBookById = %sql.one(`
  /* @name findBookById */
  SELECT * FROM books WHERE id = :id!;
`)

let res = await client->findBookById({id: 1})
```
