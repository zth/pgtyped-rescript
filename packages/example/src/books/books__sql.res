/** Types generated for queries found in "src/books/books.sql" */
open PgTyped


type category = [#"novel" | #"science-fiction" | #"thriller"]

type iso31661Alpha2 = [#"AD" | #"AE" | #"AF" | #"AG" | #"AI" | #"AL" | #"AM" | #"AO" | #"AQ" | #"AR" | #"AS" | #"AT" | #"AU" | #"AW" | #"AX" | #"AZ" | #"BA" | #"BB" | #"BD" | #"BE" | #"BF" | #"BG" | #"BH" | #"BI" | #"BJ" | #"BL" | #"BM" | #"BN" | #"BO" | #"BQ" | #"BR" | #"BS" | #"BT" | #"BV" | #"BW" | #"BY" | #"BZ" | #"CA" | #"CC" | #"CD" | #"CF" | #"CG" | #"CH" | #"CI" | #"CK" | #"CL" | #"CM" | #"CN" | #"CO" | #"CR" | #"CU" | #"CV" | #"CW" | #"CX" | #"CY" | #"CZ" | #"DE" | #"DJ" | #"DK" | #"DM" | #"DO" | #"DZ" | #"EC" | #"EE" | #"EG" | #"EH" | #"ER" | #"ES" | #"ET" | #"FI" | #"FJ" | #"FK" | #"FM" | #"FO" | #"FR" | #"GA" | #"GB" | #"GD" | #"GE" | #"GF" | #"GG" | #"GH" | #"GI" | #"GL" | #"GM" | #"GN" | #"GP" | #"GQ" | #"GR" | #"GS" | #"GT" | #"GU" | #"GW" | #"GY" | #"HK" | #"HM" | #"HN" | #"HR" | #"HT" | #"HU" | #"ID" | #"IE" | #"IL" | #"IM" | #"IN" | #"IO" | #"IQ" | #"IR" | #"IS" | #"IT" | #"JE" | #"JM" | #"JO" | #"JP" | #"KE" | #"KG" | #"KH" | #"KI" | #"KM" | #"KN" | #"KP" | #"KR" | #"KW" | #"KY" | #"KZ" | #"LA" | #"LB" | #"LC" | #"LI" | #"LK" | #"LR" | #"LS" | #"LT" | #"LU" | #"LV" | #"LY" | #"MA" | #"MC" | #"MD" | #"ME" | #"MF" | #"MG" | #"MH" | #"MK" | #"ML" | #"MM" | #"MN" | #"MO" | #"MP" | #"MQ" | #"MR" | #"MS" | #"MT" | #"MU" | #"MV" | #"MW" | #"MX" | #"MY" | #"MZ" | #"NA" | #"NC" | #"NE" | #"NF" | #"NG" | #"NI" | #"NL" | #"NO" | #"NP" | #"NR" | #"NU" | #"NZ" | #"OM" | #"PA" | #"PE" | #"PF" | #"PG" | #"PH" | #"PK" | #"PL" | #"PM" | #"PN" | #"PR" | #"PS" | #"PT" | #"PW" | #"PY" | #"QA" | #"RE" | #"RO" | #"RS" | #"RU" | #"RW" | #"SA" | #"SB" | #"SC" | #"SD" | #"SE" | #"SG" | #"SH" | #"SI" | #"SJ" | #"SK" | #"SL" | #"SM" | #"SN" | #"SO" | #"SR" | #"SS" | #"ST" | #"SV" | #"SX" | #"SY" | #"SZ" | #"TC" | #"TD" | #"TF" | #"TG" | #"TH" | #"TJ" | #"TK" | #"TL" | #"TM"]

type categoryArray = array<category>

type intArray = array<int>

type stringArray = array<string>

/** 'FindBookById' parameters type */
type findBookByIdParams = {
  id?: Null.t<int>,
}

/** 'FindBookById' return type */
type findBookByIdResult = {
  author_id: Null.t<int>,
  categories: Null.t<categoryArray>,
  id: int,
  name: Null.t<string>,
  rank: Null.t<int>,
}

/** 'FindBookById' query type */
type findBookByIdQuery = {
  params: findBookByIdParams,
  result: findBookByIdResult,
}

%%private(let findBookByIdIR: IR.t = %raw(`{"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":33}]}],"statement":"SELECT * FROM books WHERE id = :id"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM books WHERE id = :id
 * ```
 */
@module("@pgtyped/runtime") @new external findBookById: IR.t => PreparedStatement.t<findBookByIdParams, findBookByIdResult> = "PreparedQuery";
let findBookById = findBookById(findBookByIdIR)
let findBookById = (params, ~client) => findBookById->PreparedStatement.run(params, ~client)


/** 'FindBookByCategory' parameters type */
type findBookByCategoryParams = {
  category?: Null.t<category>,
}

/** 'FindBookByCategory' return type */
type findBookByCategoryResult = {
  author_id: Null.t<int>,
  categories: Null.t<categoryArray>,
  id: int,
  name: Null.t<string>,
  rank: Null.t<int>,
}

/** 'FindBookByCategory' query type */
type findBookByCategoryQuery = {
  params: findBookByCategoryParams,
  result: findBookByCategoryResult,
}

%%private(let findBookByCategoryIR: IR.t = %raw(`{"usedParamSet":{"category":true},"params":[{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":26,"b":34}]}],"statement":"SELECT * FROM books WHERE :category = ANY(categories)"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM books WHERE :category = ANY(categories)
 * ```
 */
@module("@pgtyped/runtime") @new external findBookByCategory: IR.t => PreparedStatement.t<findBookByCategoryParams, findBookByCategoryResult> = "PreparedQuery";
let findBookByCategory = findBookByCategory(findBookByCategoryIR)
let findBookByCategory = (params, ~client) => findBookByCategory->PreparedStatement.run(params, ~client)


/** 'FindBookNameOrRank' parameters type */
type findBookNameOrRankParams = {
  name?: Null.t<string>,
  rank?: Null.t<int>,
}

/** 'FindBookNameOrRank' return type */
type findBookNameOrRankResult = {
  id: int,
  name: Null.t<string>,
}

/** 'FindBookNameOrRank' query type */
type findBookNameOrRankQuery = {
  params: findBookNameOrRankParams,
  result: findBookNameOrRankResult,
}

%%private(let findBookNameOrRankIR: IR.t = %raw(`{"usedParamSet":{"name":true,"rank":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":45}]},{"name":"rank","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":61}]}],"statement":"SELECT id, name\nFROM books\nWHERE (name = :name OR rank = :rank)"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT id, name
 * FROM books
 * WHERE (name = :name OR rank = :rank)
 * ```
 */
@module("@pgtyped/runtime") @new external findBookNameOrRank: IR.t => PreparedStatement.t<findBookNameOrRankParams, findBookNameOrRankResult> = "PreparedQuery";
let findBookNameOrRank = findBookNameOrRank(findBookNameOrRankIR)
let findBookNameOrRank = (params, ~client) => findBookNameOrRank->PreparedStatement.run(params, ~client)


/** 'FindBookUnicode' parameters type */
type findBookUnicodeParams = unit

/** 'FindBookUnicode' return type */
type findBookUnicodeResult = {
  author_id: Null.t<int>,
  categories: Null.t<categoryArray>,
  id: int,
  name: Null.t<string>,
  rank: Null.t<int>,
}

/** 'FindBookUnicode' query type */
type findBookUnicodeQuery = {
  params: findBookUnicodeParams,
  result: findBookUnicodeResult,
}

%%private(let findBookUnicodeIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT * FROM books WHERE name = 'שקל'"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM books WHERE name = 'שקל'
 * ```
 */
@module("@pgtyped/runtime") @new external findBookUnicode: IR.t => PreparedStatement.t<findBookUnicodeParams, findBookUnicodeResult> = "PreparedQuery";
let findBookUnicode = findBookUnicode(findBookUnicodeIR)
let findBookUnicode = (params, ~client) => findBookUnicode->PreparedStatement.run(params, ~client)


type insertBooksParams_books = {
  rank: int,
  name: string,
  authorId: int,
  categories?: categoryArray
}
/** 'InsertBooks' parameters type */
type insertBooksParams = {
  books: array<insertBooksParams_books>,
}

/** 'InsertBooks' return type */
type insertBooksResult = {
  book_id: int,
}

/** 'InsertBooks' query type */
type insertBooksQuery = {
  params: insertBooksParams,
  result: insertBooksResult,
}

%%private(let insertBooksIR: IR.t = %raw(`{"usedParamSet":{"books":true},"params":[{"name":"books","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"rank","required":true},{"name":"name","required":true},{"name":"authorId","required":true},{"name":"categories","required":false}]},"locs":[{"a":61,"b":66}]}],"statement":"INSERT INTO books (rank, name, author_id, categories)\nVALUES :books RETURNING id as book_id"}`))

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO books (rank, name, author_id, categories)
 * VALUES :books RETURNING id as book_id
 * ```
 */
@module("@pgtyped/runtime") @new external insertBooks: IR.t => PreparedStatement.t<insertBooksParams, insertBooksResult> = "PreparedQuery";
let insertBooks = insertBooks(insertBooksIR)
let insertBooks = (params, ~client) => insertBooks->PreparedStatement.run(params, ~client)


/** 'UpdateBooksCustom' parameters type */
type updateBooksCustomParams = {
  id: int,
  rank?: Null.t<int>,
}

/** 'UpdateBooksCustom' return type */
type updateBooksCustomResult = unit

/** 'UpdateBooksCustom' query type */
type updateBooksCustomQuery = {
  params: updateBooksCustomParams,
  result: updateBooksCustomResult,
}

%%private(let updateBooksCustomIR: IR.t = %raw(`{"usedParamSet":{"rank":true,"id":true},"params":[{"name":"rank","required":false,"transform":{"type":"scalar"},"locs":[{"a":49,"b":53},{"a":95,"b":99}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":161,"b":164}]}],"statement":"UPDATE books\nSET\n    rank = (\n        CASE WHEN (:rank::int IS NOT NULL)\n                 THEN :rank\n             ELSE rank\n            END\n        )\nWHERE id = :id!"}`))

/**
 * Query generated from SQL:
 * ```
 * UPDATE books
 * SET
 *     rank = (
 *         CASE WHEN (:rank::int IS NOT NULL)
 *                  THEN :rank
 *              ELSE rank
 *             END
 *         )
 * WHERE id = :id!
 * ```
 */
@module("@pgtyped/runtime") @new external updateBooksCustom: IR.t => PreparedStatement.t<updateBooksCustomParams, updateBooksCustomResult> = "PreparedQuery";
let updateBooksCustom = updateBooksCustom(updateBooksCustomIR)
let updateBooksCustom = (params, ~client) => updateBooksCustom->PreparedStatement.run(params, ~client)


/** 'UpdateBooks' parameters type */
type updateBooksParams = {
  id: int,
  name?: Null.t<string>,
  rank?: Null.t<int>,
}

/** 'UpdateBooks' return type */
type updateBooksResult = unit

/** 'UpdateBooks' query type */
type updateBooksQuery = {
  params: updateBooksParams,
  result: updateBooksResult,
}

%%private(let updateBooksIR: IR.t = %raw(`{"usedParamSet":{"name":true,"rank":true,"id":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":54}]},{"name":"rank","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":72}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":85,"b":88}]}],"statement":"UPDATE books\n                     \nSET\n    name = :name,\n    rank = :rank\nWHERE id = :id!"}`))

/**
 * Query generated from SQL:
 * ```
 * UPDATE books
 *                      
 * SET
 *     name = :name,
 *     rank = :rank
 * WHERE id = :id!
 * ```
 */
@module("@pgtyped/runtime") @new external updateBooks: IR.t => PreparedStatement.t<updateBooksParams, updateBooksResult> = "PreparedQuery";
let updateBooks = updateBooks(updateBooksIR)
let updateBooks = (params, ~client) => updateBooks->PreparedStatement.run(params, ~client)


/** 'UpdateBooksRankNotNull' parameters type */
type updateBooksRankNotNullParams = {
  id: int,
  name?: Null.t<string>,
  rank: int,
}

/** 'UpdateBooksRankNotNull' return type */
type updateBooksRankNotNullResult = unit

/** 'UpdateBooksRankNotNull' query type */
type updateBooksRankNotNullQuery = {
  params: updateBooksRankNotNullParams,
  result: updateBooksRankNotNullResult,
}

%%private(let updateBooksRankNotNullIR: IR.t = %raw(`{"usedParamSet":{"rank":true,"name":true,"id":true},"params":[{"name":"rank","required":true,"transform":{"type":"scalar"},"locs":[{"a":28,"b":33}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":51}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":64,"b":67}]}],"statement":"UPDATE books\nSET\n    rank = :rank!,\n    name = :name\nWHERE id = :id!"}`))

/**
 * Query generated from SQL:
 * ```
 * UPDATE books
 * SET
 *     rank = :rank!,
 *     name = :name
 * WHERE id = :id!
 * ```
 */
@module("@pgtyped/runtime") @new external updateBooksRankNotNull: IR.t => PreparedStatement.t<updateBooksRankNotNullParams, updateBooksRankNotNullResult> = "PreparedQuery";
let updateBooksRankNotNull = updateBooksRankNotNull(updateBooksRankNotNullIR)
let updateBooksRankNotNull = (params, ~client) => updateBooksRankNotNull->PreparedStatement.run(params, ~client)


/** 'GetBooksByAuthorName' parameters type */
type getBooksByAuthorNameParams = {
  authorName: string,
}

/** 'GetBooksByAuthorName' return type */
type getBooksByAuthorNameResult = {
  author_id: Null.t<int>,
  categories: Null.t<categoryArray>,
  id: int,
  name: Null.t<string>,
  rank: Null.t<int>,
}

/** 'GetBooksByAuthorName' query type */
type getBooksByAuthorNameQuery = {
  params: getBooksByAuthorNameParams,
  result: getBooksByAuthorNameResult,
}

%%private(let getBooksByAuthorNameIR: IR.t = %raw(`{"usedParamSet":{"authorName":true},"params":[{"name":"authorName","required":true,"transform":{"type":"scalar"},"locs":[{"a":110,"b":121}]}],"statement":"SELECT b.* FROM books b\nINNER JOIN authors a ON a.id = b.author_id\nWHERE a.first_name || ' ' || a.last_name = :authorName!"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT b.* FROM books b
 * INNER JOIN authors a ON a.id = b.author_id
 * WHERE a.first_name || ' ' || a.last_name = :authorName!
 * ```
 */
@module("@pgtyped/runtime") @new external getBooksByAuthorName: IR.t => PreparedStatement.t<getBooksByAuthorNameParams, getBooksByAuthorNameResult> = "PreparedQuery";
let getBooksByAuthorName = getBooksByAuthorName(getBooksByAuthorNameIR)
let getBooksByAuthorName = (params, ~client) => getBooksByAuthorName->PreparedStatement.run(params, ~client)


/** 'AggregateEmailsAndTest' parameters type */
type aggregateEmailsAndTestParams = {
  testAges?: Null.t<intArray>,
}

/** 'AggregateEmailsAndTest' return type */
type aggregateEmailsAndTestResult = {
  agetest: Null.t<bool>,
  emails: stringArray,
}

/** 'AggregateEmailsAndTest' query type */
type aggregateEmailsAndTestQuery = {
  params: aggregateEmailsAndTestParams,
  result: aggregateEmailsAndTestResult,
}

%%private(let aggregateEmailsAndTestIR: IR.t = %raw(`{"usedParamSet":{"testAges":true},"params":[{"name":"testAges","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":63}]}],"statement":"SELECT array_agg(email) as \"emails!\", array_agg(age) = :testAges as ageTest FROM users"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT array_agg(email) as "emails!", array_agg(age) = :testAges as ageTest FROM users
 * ```
 */
@module("@pgtyped/runtime") @new external aggregateEmailsAndTest: IR.t => PreparedStatement.t<aggregateEmailsAndTestParams, aggregateEmailsAndTestResult> = "PreparedQuery";
let aggregateEmailsAndTest = aggregateEmailsAndTest(aggregateEmailsAndTestIR)
let aggregateEmailsAndTest = (params, ~client) => aggregateEmailsAndTest->PreparedStatement.run(params, ~client)


/** 'GetBooks' parameters type */
type getBooksParams = unit

/** 'GetBooks' return type */
type getBooksResult = {
  id: int,
  name: string,
}

/** 'GetBooks' query type */
type getBooksQuery = {
  params: getBooksParams,
  result: getBooksResult,
}

%%private(let getBooksIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT id, name as \"name!\" FROM books"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT id, name as "name!" FROM books
 * ```
 */
@module("@pgtyped/runtime") @new external getBooks: IR.t => PreparedStatement.t<getBooksParams, getBooksResult> = "PreparedQuery";
let getBooks = getBooks(getBooksIR)
let getBooks = (params, ~client) => getBooks->PreparedStatement.run(params, ~client)


/** 'CountBooks' parameters type */
type countBooksParams = unit

/** 'CountBooks' return type */
type countBooksResult = {
  book_count: Null.t<BigInt.t>,
}

/** 'CountBooks' query type */
type countBooksQuery = {
  params: countBooksParams,
  result: countBooksResult,
}

%%private(let countBooksIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT count(*) as book_count FROM books"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT count(*) as book_count FROM books
 * ```
 */
@module("@pgtyped/runtime") @new external countBooks: IR.t => PreparedStatement.t<countBooksParams, countBooksResult> = "PreparedQuery";
let countBooks = countBooks(countBooksIR)
let countBooks = (params, ~client) => countBooks->PreparedStatement.run(params, ~client)


/** 'GetBookCountries' parameters type */
type getBookCountriesParams = unit

/** 'GetBookCountries' return type */
type getBookCountriesResult = {
  country: iso31661Alpha2,
  id: int,
}

/** 'GetBookCountries' query type */
type getBookCountriesQuery = {
  params: getBookCountriesParams,
  result: getBookCountriesResult,
}

%%private(let getBookCountriesIR: IR.t = %raw(`{"usedParamSet":{},"params":[],"statement":"SELECT * FROM book_country"}`))

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM book_country
 * ```
 */
@module("@pgtyped/runtime") @new external getBookCountries: IR.t => PreparedStatement.t<getBookCountriesParams, getBookCountriesResult> = "PreparedQuery";
let getBookCountries = getBookCountries(getBookCountriesIR)
let getBookCountries = (params, ~client) => getBookCountries->PreparedStatement.run(params, ~client)


