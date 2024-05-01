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
