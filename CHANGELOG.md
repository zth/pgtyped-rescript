# 3.0.2

- Add `pgtyped-rescript diagnose` for inspecting named SQL queries with `describe`, `explain`, and `explain analyze`, including support for parameter JSON, parameter files, processed SQL output, query listing, JSON output, and statement timeouts.
- Reduce default CLI generation output to only recompiled files, errors, and concise unchanged-run summaries; pass `--verbose` to restore detailed per-file processing and skipped-file output.

# 3.0.1

- Gracefully skip optional AST-based query analysis when `pgsql-ast-parser` cannot parse valid PostgreSQL syntax, so generation can continue with database-derived types.

# 3.0.0

- BREAKING: Require ReScript `>=12.0.0`.
- BREAKING: Remove the dependency on `@rescript/core`.
- BREAKING: Remove the dependency on `@rescript/tools`; the CLI now uses the ReScript compiler toolchain from the installed `rescript` package.
- Fix `Pg.Pool.make(ConnectionString(...))` so it creates a pool with `{connectionString}` instead of passing a raw string to `pg.Pool`.
- Fix `Pg.Client.release` binding to return `unit`, matching `node-postgres`.
- Use `chokidar` for build-mode file matching so glob-style `srcDir` patterns are handled consistently with watch mode.
- Make sure `JSON.t` is properly stringified so JSON arrays can be passed to params expecting `JSON.t` without them being confused for regular Postgres arrays.
- Auto-escape all ReScript keywords in generated record field names.
- Add automatic parsing of PostgreSQL check constraints to generate ReScript polyvariant types for enumeration-style constraints. Supports both `column IN (value1, value2, ...)` and `column = ANY (ARRAY[value1, value2, ...])` patterns with string and integer values.
- Add top-level literal inference for SELECT queries. When a query returns literal values with aliases (e.g. `SELECT 'success' as status, 42 as code`), PgTyped now automatically infers specific polyvariant types like `[#"success"]` and `[#42]` instead of generic `string` and `int` types. This provides better type safety and autocompletion. Also works with UNION queries where literals are consistent across all branches.
- Add support for PostgreSQL JSON population functions (`json_populate_record`, `json_populate_recordset`, `jsonb_populate_record`, `jsonb_populate_recordset`, `json_to_record`, `jsonb_to_recordset`). This supports efficient bulk operations.
- Use the `queryConfig` API in `pgtyped-rescript-runtime`.

# 2.6.0

- Improve `pg` bindings.
- Upgrade `@rescript/core` to `1.6.0`.

# 2.5.0

- Autoinsert trailing commas in embedded SQL blocks.
- BREAKING CHANGE: `Null.t` is no longer emitted, all `null` values are autoconverted to `option`. This gives a much more idiomatic ReScript experience.
- Emit actually runnable query in module comment for each query, instead of the original non-valid SQL query.
- Relax requirement on providing query via `@name` comment.
- Change `expectOne` to panic if not finding a single item.

# 2.4.0

- Add mode for embedding `%sql` (with `one`, `expectOne`, `many`, and `execute` flavors) in ReScript directly.

# 2.3.1

- Fix missing `rescript.json` in published package.

# 2.3.0

- Fix type generation for arrays of types like `JSON.t`.
- BREAKING: Up required ReScript version to `>=11.1.0` and `@rescript/core` to `>=1.3.0`.
- Proper `bigint` support.
- Emit `@gentype` annotations for everything.
- Add each query to its own ReScript module, and emit helpers `many`, `one`, `expectOne` and `execute`.

# 2.2.2

- [CLI] bin is now named `pgtyped-rescript` so it won't clash with stock `pgtyped`.
