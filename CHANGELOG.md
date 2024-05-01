# main

- Autoinsert trailing commas in embedded SQL blocks.
- BREAKING CHANGE: `Null.t` is no longer emitted, all `null` values are autoconverted to `option`. This gives a much more idiomatic ReScript experience.
- Emit actually runnable query in module comment for each query, instead of the original non-valid SQL query.

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
