# main

- Auto-escape all ReScript keywords in generated record field names.
- Add automatic parsing of PostgreSQL check constraints to generate ReScript polyvariant types for enumeration-style constraints. Supports both `column IN (value1, value2, ...)` and `column = ANY (ARRAY[value1, value2, ...])` patterns with string and integer values.
- Add top-level literal inference for SELECT queries. When a query returns literal values with aliases (e.g., `SELECT 'success' as status, 42 as code`), PgTyped now automatically infers specific polyvariant types like `[#"success"]` and `[#42]` instead of generic `string` and `int` types. This provides better type safety and autocompletion. Also works with UNION queries where literals are consistent across all branches.
- Remove dependency on `@rescript/core` since it's not really used.

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
