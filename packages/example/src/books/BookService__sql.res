/** Types generated for queries found in "src/books/BookService.res" */
open PgTyped


@gentype
type category = [#"novel" | #"science-fiction" | #"thriller"]

@gentype
type categoryArray = array<category>


/** 'FindBookById' parameters type */
@gentype
type findBookByIdParams = {
  id?: int,
}

/** 'FindBookById' return type */
@gentype
type findBookByIdResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: int,
  name: option<string>,
  rank: option<int>,
}

/** 'FindBookById' query type */
@gentype
type findBookByIdQuery = {
  params: findBookByIdParams,
  result: findBookByIdResult,
}

%%private(let findBookByIdIR: IR.t = %raw(`{"queryName":"FindBookById","usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":33}]}],"statement":"SELECT * FROM books WHERE id = :id"}`))

/**
 Runnable query:
 ```sql
SELECT * FROM books WHERE id = $1
 ```

 */
@gentype
module FindBookById: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, findBookByIdParams) => promise<array<findBookByIdResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, findBookByIdParams) => promise<option<findBookByIdResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    findBookByIdParams,
    ~errorMessage: string=?
  ) => promise<findBookByIdResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, findBookByIdParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external findBookById: IR.t => PreparedStatement.t<findBookByIdParams, findBookByIdResult> = "PreparedQuery";
  let query = findBookById(findBookByIdIR)
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



/** 'BooksByAuthor' parameters type */
@gentype
type booksByAuthorParams = {
  authorName: string,
}

/** 'BooksByAuthor' return type */
@gentype
type booksByAuthorResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: int,
  name: option<string>,
  rank: option<int>,
}

/** 'BooksByAuthor' query type */
@gentype
type booksByAuthorQuery = {
  params: booksByAuthorParams,
  result: booksByAuthorResult,
}

%%private(let booksByAuthorIR: IR.t = %raw(`{"queryName":"BooksByAuthor","usedParamSet":{"authorName":true},"params":[{"name":"authorName","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":129}]}],"statement":"SELECT b.* FROM books b\n    INNER JOIN authors a ON a.id = b.author_id\n    WHERE a.first_name || ' ' || a.last_name = :authorName!"}`))

/**
 Runnable query:
 ```sql
SELECT b.* FROM books b
    INNER JOIN authors a ON a.id = b.author_id
    WHERE a.first_name || ' ' || a.last_name = $1
 ```

 */
@gentype
module BooksByAuthor: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, booksByAuthorParams) => promise<array<booksByAuthorResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, booksByAuthorParams) => promise<option<booksByAuthorResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    booksByAuthorParams,
    ~errorMessage: string=?
  ) => promise<booksByAuthorResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, booksByAuthorParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external booksByAuthor: IR.t => PreparedStatement.t<booksByAuthorParams, booksByAuthorResult> = "PreparedQuery";
  let query = booksByAuthor(booksByAuthorIR)
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
type insertBooks_booksInputType = {
  author_id?: int,
  categories?: categoryArray,
  id?: int,
  name?: string,
  rank?: int,
}


/** 'InsertBooks' parameters type */
@gentype
type insertBooksParams = {
  books: array<insertBooks_booksInputType>,
}

/** 'InsertBooks' return type */
@gentype
type insertBooksResult = {
  author_id: option<int>,
  categories: option<categoryArray>,
  id: int,
  name: option<string>,
  rank: option<int>,
}

/** 'InsertBooks' query type */
@gentype
type insertBooksQuery = {
  params: insertBooksParams,
  result: insertBooksResult,
}

%%private(let insertBooksIR: IR.t = %raw(`{"queryName":"InsertBooks","inputParamTransforms":{"1":{"type":"stringify"}},"usedParamSet":{"books":true},"params":[{"name":"books","required":true,"transform":{"type":"scalar"},"locs":[{"a":249,"b":255}]}],"statement":"insert into books (\n      name, \n      author_id, \n      categories, \n      rank\n    )\n      select\n        event.name,\n        event.author_id,\n        event.categories,\n        event.rank\n    from json_populate_recordset(\n      null::books,\n      :books!\n    ) as event\n    on conflict (id) do update set \n      name = excluded.name,\n      author_id = excluded.author_id,\n      categories = excluded.categories,\n      rank = excluded.rank\n    returning *"}`))

/**
 Runnable query:
 ```sql
insert into books (
      name, 
      author_id, 
      categories, 
      rank
    )
      select
        event.name,
        event.author_id,
        event.categories,
        event.rank
    from json_populate_recordset(
      null::books,
      $1
    ) as event
    on conflict (id) do update set 
      name = excluded.name,
      author_id = excluded.author_id,
      categories = excluded.categories,
      rank = excluded.rank
    returning *
 ```

 */
@gentype
module InsertBooks: {
  /** Returns an array of all matched results. */
  @gentype
  let many: (PgTyped.Pg.Client.t, insertBooksParams) => promise<array<insertBooksResult>>
  /** Returns exactly 1 result. Returns `None` if more or less than exactly 1 result is returned. */
  @gentype
  let one: (PgTyped.Pg.Client.t, insertBooksParams) => promise<option<insertBooksResult>>
  
  /** Returns exactly 1 result. Raises `Exn.t` (with an optionally provided `errorMessage`) if more or less than exactly 1 result is returned. */
  @gentype
  let expectOne: (
    PgTyped.Pg.Client.t,
    insertBooksParams,
    ~errorMessage: string=?
  ) => promise<insertBooksResult>

  /** Executes the query, but ignores whatever is returned by it. */
  @gentype
  let execute: (PgTyped.Pg.Client.t, insertBooksParams) => promise<unit>
} = {
  @module("pgtyped-rescript-runtime") @new external insertBooks: IR.t => PreparedStatement.t<insertBooksParams, insertBooksResult> = "PreparedQuery";
  let query = insertBooks(insertBooksIR)
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


