let findBookById = (client, ~id) => {
  let query = %sql.one(`
    /* @name FindBookById */
    SELECT * FROM books WHERE id = :id;
  `)

  client->query({id: id})
}

let booksByAuthor = (client, ~authorName) => {
  let query = %sql.many(`
    SELECT b.* FROM books b
    INNER JOIN authors a ON a.id = b.author_id
    WHERE a.first_name || ' ' || a.last_name = :authorName!;
  `)

  client->query({authorName: authorName})
}

let queryWithParams = %sql.one(`
  /*
    @param notification -> (payload, user_id, type)
  */
  INSERT INTO notifications (payload, user_id, type) VALUES :notification
`)

let queryWithParamsSingleLine = %sql.one(`
  /* @param notification -> (payload, user_id, type) */
  INSERT INTO notifications (payload, user_id, type) VALUES :notification
`)
