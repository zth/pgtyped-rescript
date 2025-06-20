let query = %sql.one(`
  /* @name Json */
  SELECT json_build_object('key', 'value') AS json_object;
`)
