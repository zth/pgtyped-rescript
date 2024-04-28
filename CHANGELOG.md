# main

- Fix missing `rescript.json` in published package.

# 2.3.0

- Fix type generation for arrays of types like `JSON.t`.
- BREAKING: Up required ReScript version to `>=11.1.0` and `@rescript/core` to `>=1.3.0`.
- Proper `bigint` support.
- Emit `@gentype` annotations for everything.
- Add each query to its own ReScript module, and emit helpers `many`, `one`, `expectOne` and `execute`.

# 2.2.2

- [CLI] bin is now named `pgtyped-rescript` so it won't clash with stock `pgtyped`.
