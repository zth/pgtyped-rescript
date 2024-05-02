import { parseCode } from './parseRescript.js';

test('parser finds string template in correct file', () => {
  const fileContent = `
    let query = %sql.one(\`
    /* @name FindBookById */
    SELECT * FROM books WHERE id = :id; 
    \`);
  `;

  const result = parseCode(fileContent);
  expect(result).toMatchSnapshot();
});

test('inserts trailing semicolon when needed', () => {
  const fileContent = `
    let query = %sql.one(\`
    /* @name FindBookById */
    SELECT * FROM books WHERE id = :id 
    \`);

    let queryMany = %sql.many(\`
    /* @name FindBooks */
    SELECT * FROM books
    \`);
  `;

  const result = parseCode(fileContent);
  expect(result).toMatchSnapshot();
});

test('inserts @name when needed', () => {
  const fileContent = `
    let query = %sql.one(\`
    /* @name FindBookById */
    SELECT * FROM books WHERE id = :id 
    \`);

    let queryMany = %sql.many(\`
    SELECT * FROM books
    \`);

    let queryExpect = %sql.expectOne(\`
    SELECT * FROM books WHERE id = :id
    \`);
  `;

  const result = parseCode(fileContent);
  expect(result).toMatchSnapshot();
});

test('preserves @param when inserting @name', () => {
  const fileContent = `
    let query = %sql.one(\`
    /*
      @param notification -> (payload, user_id, type)
    */
    INSERT INTO notifications (payload, user_id, type) VALUES :notification
    \`);
  `;

  const result = parseCode(fileContent);
  expect(result).toMatchSnapshot();
});
