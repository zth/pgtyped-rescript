/** Types generated for queries found in "src/books/Misc.res" */
open PgTyped


/** 'Literals' parameters type */
@gentype
type literalsParams = unit

/** 'Literals' return type */
@gentype
type literalsResult = {
  test_integer_literal: [#1],
  test_regular_string: option<string>,
  test_string_literal: [#"literal"],
}

/** 'Literals' query type */
@gentype
type literalsQuery = {
  params: literalsParams,
  result: literalsResult,
}

%%private(let literalsIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"select\n    'literal' as test_string_literal,\n    1 as test_integer_literal,\n    'hello ' || 'world' as test_regular_string"}`))

/**
 Runnable query:
 ```sql
select
    'literal' as test_string_literal,
    1 as test_integer_literal,
    'hello ' || 'world' as test_regular_string
 ```

 */
@gentype
module Literals: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, literalsParams) => promise<array<literalsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, literalsParams) => promise<option<literalsResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    literalsParams,
    ~errorMessage: string=?
  ) => promise<literalsResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, literalsParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external literals: IR.t => PreparedStatement.t<literalsParams, literalsResult> = "PreparedQuery";
  let query = literals(literalsIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'Literals.many' directly instead")
let literals = (params, ~client) => Literals.many(client, params)


/** 'MoreLiterals' parameters type */
@gentype
type moreLiteralsParams = unit

/** 'MoreLiterals' return type */
@gentype
type moreLiteralsResult = {
  admin_role: [#"admin"],
  error_status: [#"error"],
  guest_role: [#"guest"],
  magic_number: [#42],
  max_percentage: [#100],
  negative_one: option<int>,
  pending_status: [#"pending"],
  status: [#"success"],
  user_role: [#"user"],
  zero_value: [#0],
}

/** 'MoreLiterals' query type */
@gentype
type moreLiteralsQuery = {
  params: moreLiteralsParams,
  result: moreLiteralsResult,
}

%%private(let moreLiteralsIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"select\n    'success' as status,\n    'error' as error_status,\n    'pending' as pending_status,\n    42 as magic_number,\n    0 as zero_value,\n    -1 as negative_one,\n    100 as max_percentage,\n    'admin' as admin_role,\n    'user' as user_role,\n    'guest' as guest_role"}`))

/**
 Runnable query:
 ```sql
select
    'success' as status,
    'error' as error_status,
    'pending' as pending_status,
    42 as magic_number,
    0 as zero_value,
    -1 as negative_one,
    100 as max_percentage,
    'admin' as admin_role,
    'user' as user_role,
    'guest' as guest_role
 ```

 */
@gentype
module MoreLiterals: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, moreLiteralsParams) => promise<array<moreLiteralsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, moreLiteralsParams) => promise<option<moreLiteralsResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    moreLiteralsParams,
    ~errorMessage: string=?
  ) => promise<moreLiteralsResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, moreLiteralsParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external moreLiterals: IR.t => PreparedStatement.t<moreLiteralsParams, moreLiteralsResult> = "PreparedQuery";
  let query = moreLiterals(moreLiteralsIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'MoreLiterals.many' directly instead")
let moreLiterals = (params, ~client) => MoreLiterals.many(client, params)


/** 'DuplicateAliasTest' parameters type */
@gentype
type duplicateAliasTestParams = unit

/** 'DuplicateAliasTest' return type */
@gentype
type duplicateAliasTestResult = {
  priority: [#1],
  status: option<string>,
  sub_status: option<string>,
}

/** 'DuplicateAliasTest' query type */
@gentype
type duplicateAliasTestQuery = {
  params: duplicateAliasTestParams,
  result: duplicateAliasTestResult,
}

%%private(let duplicateAliasTestIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"select\n    'main' as status,\n    1 as priority,\n    (select 'sub' as status) as sub_status"}`))

/**
 Runnable query:
 ```sql
select
    'main' as status,
    1 as priority,
    (select 'sub' as status) as sub_status
 ```

 */
@gentype
module DuplicateAliasTest: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, duplicateAliasTestParams) => promise<array<duplicateAliasTestResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, duplicateAliasTestParams) => promise<option<duplicateAliasTestResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    duplicateAliasTestParams,
    ~errorMessage: string=?
  ) => promise<duplicateAliasTestResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, duplicateAliasTestParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external duplicateAliasTest: IR.t => PreparedStatement.t<duplicateAliasTestParams, duplicateAliasTestResult> = "PreparedQuery";
  let query = duplicateAliasTest(duplicateAliasTestIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'DuplicateAliasTest.many' directly instead")
let duplicateAliasTest = (params, ~client) => DuplicateAliasTest.many(client, params)


/** 'UnionTest' parameters type */
@gentype
type unionTestParams = unit

/** 'UnionTest' return type */
@gentype
type unionTestResult = {
  document_status: option<string>,
  version: option<int>,
}

/** 'UnionTest' query type */
@gentype
type unionTestQuery = {
  params: unionTestParams,
  result: unionTestResult,
}

%%private(let unionTestIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"select 'draft' as document_status, 1 as version\n  union all\n  select 'published' as document_status, 2 as version"}`))

/**
 Runnable query:
 ```sql
select 'draft' as document_status, 1 as version
  union all
  select 'published' as document_status, 2 as version
 ```

 */
@gentype
module UnionTest: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, unionTestParams) => promise<array<unionTestResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, unionTestParams) => promise<option<unionTestResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    unionTestParams,
    ~errorMessage: string=?
  ) => promise<unionTestResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, unionTestParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external unionTest: IR.t => PreparedStatement.t<unionTestParams, unionTestResult> = "PreparedQuery";
  let query = unionTest(unionTestIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'UnionTest.many' directly instead")
let unionTest = (params, ~client) => UnionTest.many(client, params)


/** 'SingleLiterals' parameters type */
@gentype
type singleLiteralsParams = unit

/** 'SingleLiterals' return type */
@gentype
type singleLiteralsResult = {
  booking_status: [#"confirmed"],
  rating_stars: [#5],
  subscription_tier: [#"premium"],
}

/** 'SingleLiterals' query type */
@gentype
type singleLiteralsQuery = {
  params: singleLiteralsParams,
  result: singleLiteralsResult,
}

%%private(let singleLiteralsIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"select\n    'confirmed' as booking_status,\n    5 as rating_stars,\n    'premium' as subscription_tier"}`))

/**
 Runnable query:
 ```sql
select
    'confirmed' as booking_status,
    5 as rating_stars,
    'premium' as subscription_tier
 ```

 */
@gentype
module SingleLiterals: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, singleLiteralsParams) => promise<array<singleLiteralsResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, singleLiteralsParams) => promise<option<singleLiteralsResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    singleLiteralsParams,
    ~errorMessage: string=?
  ) => promise<singleLiteralsResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, singleLiteralsParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external singleLiterals: IR.t => PreparedStatement.t<singleLiteralsParams, singleLiteralsResult> = "PreparedQuery";
  let query = singleLiterals(singleLiteralsIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'SingleLiterals.many' directly instead")
let singleLiterals = (params, ~client) => SingleLiterals.many(client, params)


/** 'EdgeCases' parameters type */
@gentype
type edgeCasesParams = unit

/** 'EdgeCases' return type */
@gentype
type edgeCasesResult = {
  empty_string: [#""],
  large_number: [#123456789],
  minus_one: option<int>,
  negative_number: option<int>,
  null_string: [#"null"],
  single_char: [#"a"],
  string_with_spaces: [#"with spaces"],
  zero: [#0],
}

/** 'EdgeCases' query type */
@gentype
type edgeCasesQuery = {
  params: edgeCasesParams,
  result: edgeCasesResult,
}

%%private(let edgeCasesIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"select\n    '' as empty_string,\n    -999 as negative_number,\n    0 as zero,\n    'null' as null_string,\n    123456789 as large_number,\n    'a' as single_char,\n    'with spaces' as string_with_spaces,\n    -1 as minus_one"}`))

/**
 Runnable query:
 ```sql
select
    '' as empty_string,
    -999 as negative_number,
    0 as zero,
    'null' as null_string,
    123456789 as large_number,
    'a' as single_char,
    'with spaces' as string_with_spaces,
    -1 as minus_one
 ```

 */
@gentype
module EdgeCases: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, edgeCasesParams) => promise<array<edgeCasesResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, edgeCasesParams) => promise<option<edgeCasesResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    edgeCasesParams,
    ~errorMessage: string=?
  ) => promise<edgeCasesResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, edgeCasesParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external edgeCases: IR.t => PreparedStatement.t<edgeCasesParams, edgeCasesResult> = "PreparedQuery";
  let query = edgeCases(edgeCasesIR)
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
  | [item] => item
  | _ => panic(errorMessage->Option.getOr("More or less than one item was returned"))
  }

  @gentype
  let execute = async (client, params) => {
    let _ = await query(params, ~client)
  }
}

@gentype
@deprecated("Use 'EdgeCases.many' directly instead")
let edgeCases = (params, ~client) => EdgeCases.many(client, params)


