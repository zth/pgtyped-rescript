open PgTyped

module Jest = {
  type asyncCallback = unit => promise<unit>
  type syncCallback = unit => unit

  @module("@jest/globals")
  external beforeAll: asyncCallback => unit = "beforeAll"

  @module("@jest/globals")
  external afterAll: asyncCallback => unit = "afterAll"

  @module("@jest/globals")
  external beforeEachAsync: asyncCallback => unit = "beforeEach"

  @module("@jest/globals")
  external afterEachAsync: asyncCallback => unit = "afterEach"

  module Expect = {
    type t

    @send external toMatchSnapshot: t => unit = "toMatchSnapshot"
    @send external toMatchSnapshotWithConfig: (t, {..}) => unit = "toMatchSnapshot"
    @get external resolves: t => t = "resolves"
    @send external toEqual: (t, 'shouldEqualThis) => unit = "toEqual"
    @send external toBe: (t, 'shouldEqualThis) => unit = "toBe"

    module Any = {
      type t
      type expected
      let number: t = %raw(`Number`)
    }

    @send external any: (t, Any.t) => Any.expected = "any"
  }

  @module("@jest/globals")
  external expect: 'thing => Expect.t = "expect"

  @module("@jest/globals")
  external expectThis: Expect.t = "expect"

  @module("@jest/globals")
  external testAsync: (string, asyncCallback) => unit = "test"
}

open Jest

external env: {..} = "process.env"
@val external encodeURIComponent: string => string = "encodeURIComponent"

let dbHost = env["PGHOST"]->Option.getOr("127.0.0.1")
let dbUser = env["PGUSER"]->Option.getOr("postgres")
let dbPassword = env["PGPASSWORD"]->Option.getOr("password")
let dbDatabase = env["PGDATABASE"]->Option.getOr("postgres")
let dbPort = env["PGPORT"]->Option.flatMap(port => Int.fromString(port))->Option.getOr(5432)

let dbConfig = {
  Pg.Client.host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase,
  port: dbPort,
}

let client = ref(None)
let getClient = () => client.contents->Option.getOrThrow
let pool = ref(None)
let getPool = () =>
  switch pool.contents {
  | Some(pool) => pool
  | None => panic("Expected the PostgreSQL pool to be initialized")
  }

type bookCount = {book_count: string}

let countBooksWithClient: Pg.Client.t => promise<string> = async client => {
  let result: Pg.PgResult.t<bookCount> = await client->Pg.Client.query(
    "SELECT count(*) as book_count FROM books",
  )

  switch result.rows {
  | [{book_count}] => book_count
  | _ => panic("Expected a single book count row")
  }
}

beforeAll(async () => {
  let dbClient = Pg.Client.make(Config(dbConfig))
  client := Some(dbClient)
  await dbClient->Pg.Client.connect

  let connectionString =
    env["DATABASE_URL"]->Option.getOr(
      "postgres://" ++
      dbUser->encodeURIComponent ++
      ":" ++
      dbPassword->encodeURIComponent ++
      "@" ++
      dbHost ++
      ":" ++
      dbPort->Int.toString ++
      "/" ++
      dbDatabase->encodeURIComponent,
    )
  pool := Some(Pg.Pool.make(ConnectionString(connectionString)))
})

afterAll(async () => {
  await getPool()->Pg.Pool.end
  await getClient()->Pg.Client.end
})

beforeEachAsync(async () => {
  let _ = await getClient()->Pg.Client.query("BEGIN")
})

afterEachAsync(async () => {
  let _ = await getClient()->Pg.Client.query("ROLLBACK")
})

module Comments = Comments__sql
module Books = Books__sql
module Notifications = Notifications__sql

testAsync("client transaction rolls back when the callback raises", async () => {
  let transactionClient = await getPool()->Pg.Pool.connect

  try {
    let beforeCount = await transactionClient->countBooksWithClient
    let failed = switch await transactionClient->Pg.Client.transaction(async client => {
      await client->Books.InsertBook.execute({
        author_id: 1,
        name: "Rolled back client transaction",
        rank: 1,
      })
      panic("Stop client transaction")
    }) {
    | exception JsExn(_) => true
    | _ => false
    }
    let afterCount = await transactionClient->countBooksWithClient

    expect(failed)->Expect.toBe(true)
    expect(afterCount)->Expect.toBe(beforeCount)
    await transactionClient->Pg.Client.release
  } catch {
  | exn =>
    await transactionClient->Pg.Client.release
    throw(exn)
  }
})

testAsync("pool transaction releases the client and rolls back when the callback raises", async () => {
  let beforeCount = await getClient()->countBooksWithClient
  let failed = switch await getPool()->Pg.Pool.transaction(async client => {
    await client->Books.InsertBook.execute({
      author_id: 1,
      name: "Rolled back pool transaction",
      rank: 1,
    })
    panic("Stop pool transaction")
  }) {
  | exception JsExn(_) => true
  | _ => false
  }
  let afterCount = await getClient()->countBooksWithClient

  expect(failed)->Expect.toBe(true)
  expect(afterCount)->Expect.toBe(beforeCount)
  expect(getPool()->Pg.Pool.idleCount)->Expect.toBe(1)
})

testAsync("select query with unicode characters", async () => {
  let result = await getClient()->Books.FindBookUnicode.many()
  expect(result)->Expect.toMatchSnapshot
})

testAsync("select query with parameters", async () => {
  let comments = await getClient()->Comments.GetAllComments.many({id: 1})
  expect(comments)->Expect.toMatchSnapshot
})

testAsync("select query with dynamic or", async () => {
  let result = await getClient()->Books.FindBookNameOrRank.many({
    rank: 1,
  })
  expect(result)->Expect.toMatchSnapshot
})

testAsync("insert query with parameter spread", async () => {
  let insertedBookId = switch await getClient()->Books.InsertBooks.many({
    books: [
      {
        authorId: 1,
        name: "A Brief History of Time: From the Big Bang to Black Holes",
        rank: 1,
        categories: [#novel, #"science-fiction"],
      },
    ],
  }) {
  | [{book_id: id}] => id
  | _ => panic("Unexpected result inserting books")
  }

  switch await getClient()->Books.FindBookById.many({id: insertedBookId}) {
  | [insertedBook] => expect(insertedBook.categories)->Expect.toEqual("{novel,science-fiction}")
  | _ => panic("Unexpected result fetching newly inserted book")
  }
})

testAsync("insert query with non-supplied optional value", async () => {
  let insertedBookId = switch await getClient()->Books.InsertBooks.many({
    books: [
      {
        authorId: 1,
        name: "A Brief History of Time: From the Big Bang to Black Holes",
        rank: 1,
      },
    ],
  }) {
  | [{book_id: id}] => id
  | _ => panic("Unexpected result inserting books")
  }

  switch await getClient()->Books.FindBookById.many({id: insertedBookId}) {
  | [insertedBook] => expect(insertedBook.categories)->Expect.toEqual(None)
  | _ => panic("Unexpected result fetching newly inserted book")
  }
})

testAsync("insert query with non-supplied opt value", async () => {
  let insertedBookId = switch await getClient()->Books.InsertBook.one({
    author_id: 1,
    name: "A Brief History of Time: From the Big Bang to Black Holes",
    rank: 1,
  }) {
  | Some({book_id: id}) => id
  | None => panic("Unexpected result inserting book")
  }

  switch await getClient()->Books.FindBookById.one({id: insertedBookId}) {
  | Some(insertedBook) => expect(insertedBook.categories)->Expect.toEqual(None)
  | None => panic("Unexpected result fetching newly inserted book")
  }
})

testAsync("update query with a non-null parameter override", async () => {
  let _ = await getClient()->Books.UpdateBooks.many({
    id: 2,
    rank: 12,
    name: "Another title",
  })
})

testAsync("insert query with an inline sql comment", async () => {
  switch await getClient()->Comments.InsertComment.many({
    comments: [{commentBody: "Just a comment", userId: 1}],
  }) {
  | [result] =>
    expect(result)->Expect.toMatchSnapshotWithConfig({
      "id": expectThis->Expect.any(Expect.Any.number),
    })
  | _ => panic("Failed")
  }
})

testAsync("dynamic update query", async () => {
  let _ = await getClient()->Books.UpdateBooksCustom.many({id: 2, rank: 13})
})

testAsync("update query with a multiple non-null parameter overrides", async () => {
  let _ = await getClient()->Books.UpdateBooksRankNotNull.many({
    id: 2,
    rank: 12,
    name: "Another title",
  })
})

testAsync("select query with join and a parameter override", async () => {
  let books = await getClient()->Books.GetBooksByAuthorName.many({
    authorName: "Carl Sagan",
  })
  expect(books)->Expect.toMatchSnapshot
})

testAsync("select query with aggregation", async () => {
  switch await getClient()->Books.AggregateEmailsAndTest.many({testAges: [35, 23, 19]}) {
  | [aggregateData] =>
    expect(aggregateData.agetest)->Expect.toBe(true)
    expect(aggregateData.emails)->Expect.toEqual([
      "alex.doe@example.com",
      "jane.holmes@example.com",
      "andrewjackson@example.com",
    ])
  | _ => panic("Failed")
  }
})

testAsync("insert query with an enum field", async () => {
  let _ = await getClient()->Notifications.SendNotifications.many({
    notifications: [
      {
        user_id: 2,
        payload: {
          open JSON
          Object(Dict.fromArray([("num_frogs", Number(82.))]))
        },
        type_: #reminder,
      },
    ],
  })
})

testAsync("select query with json fields and casts", async () => {
  let notifications = await getClient()->Notifications.ThresholdFrogs.many({numFrogs: 80})
  expect(notifications)->Expect.toMatchSnapshot
})

testAsync("select query nullability override on return field", async () => {
  let result = await getClient()->Books.GetBooks.many()
  expect(result)->Expect.toMatchSnapshot
})

testAsync("select exists query, testing #472", async () => {
  let result = await getClient()->Comments.SelectExistsTest.many()
  expect(result)->Expect.toMatchSnapshot
})

testAsync("`one` works in success case", async () => {
  let result = await getClient()->Books.GetBooksByAuthorName.one({authorName: "Carl Sagan"})
  expect(result->Option.isSome)->Expect.toBe(true)
})

testAsync("`one` works in fail case", async () => {
  let result = await getClient()->Books.GetBooksByAuthorName.one({authorName: "Bertolt Brecht"})
  expect(result->Option.isSome)->Expect.toBe(false)
})

testAsync("`expectOne` works", async () => {
  let _result = await getClient()->Books.GetBooksByAuthorName.expectOne({authorName: "Carl Sagan"})
  expect(true)->Expect.toBe(true)
})

testAsync("`expectOne` works in fail case", async () => {
  let result = switch await getClient()->Books.GetBooksByAuthorName.expectOne({
    authorName: "Bertolt Brecht",
  }) {
  | exception JsExn(_) => true
  | _ => false
  }

  expect(result)->Expect.toBe(true)
})

testAsync("insert query with json_populate_recordset", async () => {
  let (insertedBookId1, insertedBookId2) = switch await getClient()->BookService.insertBooks(
    ~books=[
      {
        author_id: 1,
        name: "A Brief History of Time: From the Big Bang to Black Holes",
        rank: 1,
        categories: [#novel, #"science-fiction"],
      },
      {
        author_id: 1,
        name: "A Brief History of Time: From the Big Bang to Black Holes 2",
        rank: 2,
        categories: [#"science-fiction"],
      },
    ],
  ) {
  | [{id: id1}, {id: id2}] => (id1, id2)
  | _ => panic("Unexpected result inserting books")
  }

  switch await getClient()->Books.FindBookById.one({id: insertedBookId1}) {
  | Some(insertedBook) =>
    expect(insertedBook.name)->Expect.toEqual(
      "A Brief History of Time: From the Big Bang to Black Holes",
    )
  | None => panic("Unexpected result fetching newly inserted book")
  }

  switch await getClient()->Books.FindBookById.one({id: insertedBookId2}) {
  | Some(insertedBook) =>
    expect(insertedBook.name)->Expect.toEqual(
      "A Brief History of Time: From the Big Bang to Black Holes 2",
    )
  | None => panic("Unexpected result fetching newly inserted book")
  }
})

testAsync("json array inputs work", async () => {
  let result = await getClient()->Json.JsonExtract.one({
    jsonData: JSON.Array([
      JSON.Object(Dict.fromArray([("id", JSON.String("1")), ("name", JSON.String("John"))])),
    ]),
  })

  expect(result)->Expect.toEqual({
    "user_id": "1",
    "user_name": "John",
  })
})
