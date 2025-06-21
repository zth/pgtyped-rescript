let query = %sql.one(`
  /* @name Literals */
  select
    'literal' as test_string_literal,
    1 as test_integer_literal,
    'hello ' || 'world' as test_regular_string
`)

let moreExamples = %sql.one(`
  /* @name MoreLiterals */
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
`)

// Test case with subquery - same alias appears multiple times
// This should test that duplicates are handled properly (removed from inference)
let duplicateAliasTest = %sql.one(`
  /* @name DuplicateAliasTest */
  select
    'main' as status,
    1 as priority,
    (select 'sub' as status) as sub_status
`)

// Test with UNION - another case where same alias might appear
// Same aliases should prevent inference
let unionTest = %sql.many(`
  /* @name UnionTest */
  select 'draft' as document_status, 1 as version
  union all
  select 'published' as document_status, 2 as version
`)

// Test with single literals that should work
let singleLiterals = %sql.one(`
  /* @name SingleLiterals */
  select
    'confirmed' as booking_status,
    5 as rating_stars,
    'premium' as subscription_tier
`)

// Test edge cases for literal inference
let edgeCases = %sql.one(`
  /* @name EdgeCases */
  select
    '' as empty_string,
    -999 as negative_number,
    0 as zero,
    'null' as null_string,
    123456789 as large_number,
    'a' as single_char,
    'with spaces' as string_with_spaces,
    -1 as minus_one
`)
