let query = %sql.one(`
  /* @name Json */
  SELECT json_build_object('key', 'value') AS json_object;
`)

let jsonPopulateRecordsetQuery = %sql.one(`
  /* @name JsonPopulateRecordset */
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

let jsonPopulateRecordsetJsonCastQuery = %sql.one(`
  /* @name JsonPopulateRecordsetJsonCast */
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
    :books!::json
  ) as event
  on conflict (id) do update set 
    name = excluded.name,
    author_id = excluded.author_id,
    categories = excluded.categories,
    rank = excluded.rank
  returning *
`)
