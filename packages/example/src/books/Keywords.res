let query = %sql.one(`
  /* @name Keywords */
  select * from rescript_keywords_need_to_be_escaped
`)
