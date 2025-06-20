let query = %sql.one(`
  /* @name Dump */
  SELECT * FROM dump LIMIT 1;
`)
