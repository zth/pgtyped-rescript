let findBookById = (client, ~id) => {
  let query = %sql.one(`
    /* @name FindBookById */
    SELECT * FROM books WHERE id = :id;
  `)

  client->query({id: id})
}

let booksByAuthor = (client, ~authorName) => {
  let query = %sql.many(`
    /* @name BooksByAuthor */
    SELECT b.* FROM books b
    INNER JOIN authors a ON a.id = b.author_id
    WHERE a.first_name || ' ' || a.last_name = :authorName!;
  `)

  client->query({authorName: authorName})
}

let insertBooks = (client, ~books) => {
  let query = %sql.many(`
    /* @name InsertBooks */
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
      :books!
    ) as event
    on conflict (id) do update set 
      name = excluded.name,
      author_id = excluded.author_id,
      categories = excluded.categories,
      rank = excluded.rank
    returning *
  `)

  client->query({books: books})
}
