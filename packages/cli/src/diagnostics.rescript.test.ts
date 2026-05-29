import { jest } from '@jest/globals';
import { parseSQLFile, queryASTToIR } from '@pgtyped/parser';
import fs from 'fs';
import {
  getParameterLabels,
  parseErrorFields,
  runDiagnostics,
} from './diagnostics.js';

const sqlFile = '../example/src/books/books.sql';

describe('diagnostics', () => {
  let logSpy: ReturnType<typeof jest.spyOn>;
  let errorSpy: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test('lists query names without config', async () => {
    await runDiagnostics(undefined, {
      file: sqlFile,
      list: true,
      mode: 'explain',
      format: 'text',
    });

    expect(logSpy).toHaveBeenCalledWith('FindBookById');
    expect(logSpy).toHaveBeenCalledWith('InsertBooks');
  });

  test('prints processed SQL without config', async () => {
    await runDiagnostics(undefined, {
      file: sqlFile,
      queryName: 'FindBookById',
      sql: true,
      mode: 'explain',
      format: 'text',
    });

    expect(logSpy).toHaveBeenCalledWith('SELECT * FROM books WHERE id = $1');
  });

  test('keeps scalar parameter labels when params are supplied', () => {
    const query = parseSQLFile(`
      /* @name FindBookById */
      SELECT * FROM books WHERE id = :id;
    `).queries[0];

    const labels = getParameterLabels(queryASTToIR(query, null), { id: 1 });

    expect(labels.get(1)).toBe('id');
  });

  test('does not require params for unused parameter declarations', async () => {
    const file = '/tmp/pgtyped-unused-params.sql';
    await fs.promises.writeFile(
      file,
      `
        /*
          @name StaticQuery
          @param unused -> (id!)
        */
        SELECT 1;
      `,
    );

    await runDiagnostics(undefined, {
      file,
      queryName: 'StaticQuery',
      sql: true,
      mode: 'explain',
      format: 'text',
    });

    expect(logSpy).toHaveBeenCalledWith('SELECT 1');
  });

  test('uses SQLSTATE as parse error code', () => {
    expect(
      parseErrorFields({
        C: '42601',
        M: 'syntax error at or near "FROM"',
        R: 'scanner_yyerror',
      }),
    ).toMatchObject({
      errorCode: '42601',
      message: 'syntax error at or near "FROM"',
    });
  });

  test('keeps spread-pick labels when params are supplied', () => {
    const query = parseSQLFile(`
      /*
        @name InsertBooks
        @param books -> ((rank!, name!)...)
      */
      INSERT INTO books (rank, name)
      VALUES :books;
    `).queries[0];

    const labels = getParameterLabels(queryASTToIR(query, null), {
      books: [
        { rank: 1, name: 'one' },
        { rank: 2, name: 'two' },
      ],
    });

    expect([...labels.values()]).toEqual([
      'books.rank',
      'books.name',
      'books.rank',
      'books.name',
    ]);
  });
});
