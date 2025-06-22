let query = %sql.one(`
  /* @name Json */
  SELECT json_build_object('key', 'value') AS json_object;
`)

module JsonExtract = %sql(`
  /* @name JsonExtract */
  SELECT 
    value->>'name' AS user_name,
    value->>'id' AS user_id
  FROM json_array_elements(:jsonData!::json) AS value
`)

let jsonUnnestCast = %sql.one(`
  /* @name JsonUnnestCast */
  SELECT unnest(:jsonData!::json[]) AS json_arr;
`)

let jsonPopulateRecordQuery = %sql.one(`
  /* @name JsonPopulateRecord */
  SELECT * FROM json_populate_record(
    null::books,
    :book!
  );
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

let jsonbPopulateRecordQuery = %sql.one(`
  /* @name JsonbPopulateRecord */
  SELECT * FROM jsonb_populate_record(
    null::books,
    :book!
  );
`)

let jsonbPopulateRecordsetQuery = %sql.one(`
  /* @name JsonbPopulateRecordset */
  SELECT * FROM jsonb_populate_recordset(
    null::books,
    :books!
  );
`)
