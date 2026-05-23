## pgtyped-rescript

This package provides the `pgtyped-rescript` CLI.
The `pgtyped-rescript` CLI can work in build and watch mode.

### Flags:

The CLI supports two flags:

- `-c config_file_path.json` to pass the config file path.
- `-w` to start in watch mode.

Running the CLI:

```
npx pgtyped-rescript -w -c config.json
```

### Env variables:

PgTyped supports common PostgreSQL environment variables:

- `PGHOST`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`
- `PGPORT`

These variables will override values provided in `config.json`.

### Config file:

Config file format (`config.json`):

```js
{
  // You can specify as many transforms as you want
  // ReScript and SQL files are supported.
  "transforms": [
    {
      "mode": "sql", // SQL mode
      "include": "**/*.sql", // SQL files pattern to scan for queries
      "emitTemplate": "{{dir}}/{{name}}__queries.res" // File name template to save generated files
    },
    {
      "mode": "res", // ReScript mode
      "include": "**/*.res", // ReScript files pattern to scan for embedded SQL
      "emitTemplate": "{{dir}}/{{name}}__sql.res" // File name template to save generated files
    }
  ],
  "srcDir": "./src/", // Directory to scan or watch for query files
  "failOnError": false, // Whether to fail on a file processing error and abort generation (can be omitted - default is false)
  "camelCaseColumnNames": false, // convert to camelCase column names of result interface
  "db": {
    "dbName": "testdb", // DB name
    "user": "user", // DB username
    "password": "password", // DB password (optional)
    "host": "127.0.0.1" // DB host (optional)
  }
}
```

### Generated files

By default, PgTyped saves generated files in the same folder as the source files it parses.
This behavior can be customized using the `emitTemplate` config parameter.
In that template, four parameters are available for interpolation: `root`, `dir`, `base`, `name` and `ext`.
For example, when parsing source/query file `/home/user/dir/file.sql`, these parameters are assigned the following values:

```
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .sql "
└──────┴──────────────┴──────┴─────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```

---

This package is part of the ReScript fork of PgTyped.
Refer to the root [README](../../README.md) for details.
