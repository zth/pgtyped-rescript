let queryWithParamsSingleLine = %sql.one(`
  /* @param notification -> (payload, user_id, type) */
  INSERT INTO notifications (payload, user_id, type) VALUES :notification
`)
