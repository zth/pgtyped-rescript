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

let dbConfig = {
  Pg.Client.host: env["PGHOST"]->Option.getWithDefault("127.0.0.1"),
  user: env["PGUSER"]->Option.getWithDefault("postgres"),
  password: env["PGPASSWORD"]->Option.getWithDefault("password"),
  database: env["PGDATABASE"]->Option.getWithDefault("postgres"),
  port: env["PGPORT"]->Option.flatMap(port => Int.fromString(port))->Option.getWithDefault(5432),
}

let client = ref(None)
let getClient = () => client.contents->Option.getExn

beforeAll(async () => {
  let dbClient = Pg.Client.make(dbConfig)
  client := Some(dbClient)
  await dbClient->Pg.Client.connect
})

afterAll(async () => {
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

testAsync("select query with unicode characters", async () => {
  let result = await Books.findBookUnicode((), ~client=getClient())
  expect(result)->Expect.toMatchSnapshot
})

testAsync("select query with parameters", async () => {
  let comments = await Comments.getAllComments({id: 1}, ~client=getClient())
  expect(comments)->Expect.toMatchSnapshot
})

testAsync("select query with dynamic or", async () => {
  let result = await Books.findBookNameOrRank(
    {
      rank: Value(1),
    },
    ~client=getClient(),
  )
  expect(result)->Expect.toMatchSnapshot
})

testAsync("insert query with parameter spread", async () => {
  let insertedBookId = switch await Books.insertBooks(
    {
      books: [
        {
          authorId: 1,
          name: "A Brief History of Time: From the Big Bang to Black Holes",
          rank: 1,
          categories: [#novel, #"science-fiction"],
        },
      ],
    },
    ~client=getClient(),
  ) {
  | [{book_id: id}] => id
  | _ => panic("Unexpected result inserting books")
  }

  switch await Books.findBookById({id: Value(insertedBookId)}, ~client=getClient()) {
  | [insertedBook] => expect(insertedBook.categories)->Expect.toEqual("{novel,science-fiction}")
  | _ => panic("Unexpected result fetching newly inserted book")
  }
})

testAsync("update query with a non-null parameter override", async () => {
  let _ = await Books.updateBooks(
    {id: 2, rank: Value(12), name: Value("Another title")},
    ~client=getClient(),
  )
})

testAsync("insert query with an inline sql comment", async () => {
  switch await Comments.insertComment(
    {comments: [{commentBody: "Just a comment", userId: 1}]},
    ~client=getClient(),
  ) {
  | [result] =>
    expect(result)->Expect.toMatchSnapshotWithConfig({
      "id": expectThis->Expect.any(Expect.Any.number),
    })
  | _ => panic("Failed")
  }
})

testAsync("dynamic update query", async () => {
  let _ = await Books.updateBooksCustom({id: 2, rank: Value(13)}, ~client=getClient())
})

testAsync("update query with a multiple non-null parameter overrides", async () => {
  let _ = await Books.updateBooksRankNotNull(
    {id: 2, rank: 12, name: Value("Another title")},
    ~client=getClient(),
  )
})

testAsync("select query with join and a parameter override", async () => {
  let books = await Books.getBooksByAuthorName(
    {
      authorName: "Carl Sagan",
    },
    ~client=getClient(),
  )
  expect(books)->Expect.toMatchSnapshot
})

testAsync("select query with aggregation", async () => {
  switch await Books.aggregateEmailsAndTest({testAges: Value([35, 23, 19])}, ~client=getClient()) {
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
  let _ = await Notifications.sendNotifications(
    {
      notifications: [
        {
          user_id: 2,
          payload: {
            open Js.Json
            Object(Dict.fromArray([("num_frogs", Number(82.))]))
          },
          type_: #reminder,
        },
      ],
    },
    ~client=getClient(),
  )
})

testAsync("select query with json fields and casts", async () => {
  let notifications = await Notifications.thresholdFrogs({numFrogs: 80}, ~client=getClient())
  expect(notifications)->Expect.toMatchSnapshot
})

testAsync("select query nullability override on return field", async () => {
  let result = await Books.getBooks((), ~client=getClient())
  expect(result)->Expect.toMatchSnapshot
})

testAsync("select exists query, testing #472", async () => {
  let result = await Comments.selectExistsTest((), ~client=getClient())
  expect(result)->Expect.toMatchSnapshot
})
