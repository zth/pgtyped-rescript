import { parseSQLFile } from '@pgtyped/parser';
import { SQLParseResult } from '@pgtyped/parser/lib/loader/sql';
import cp from 'child_process';
// @ts-ignore
import { getBinaryPath } from '@rescript/tools/npm/getBinaryPath.js';

export function parseCode(
  fileContent: string,
  fileName: string,
): SQLParseResult {
  if (!fileContent.includes('%sql')) {
    return {
      queries: [],
      events: [],
    };
  }

  // Replace with more robust @rescript/tools CLI usage when that package ships linuxarm64 binary.
  const content: Array<{ contents: string }> = JSON.parse(
    cp
      .execFileSync(getBinaryPath(), [
        'extract-embedded',
        ['sql', 'sql.one', 'sql.expectOne', 'sql.many', 'sql.execute'].join(
          ',',
        ),
        fileName,
      ])
      .toString(),
  );

  content.reverse();

  const queries: Array<string> = [];
  let unnamedQueriesCount = 0;

  content.forEach((v) => {
    let query = v.contents.trim();
    if (!query.endsWith(';')) {
      query += ';';
    }

    if (!query.includes('@name')) {
      unnamedQueriesCount += 1;
      // Handle potentially existing doc comment
      if (query.trim().startsWith('/*')) {
        const lines = query.split('\n');

        let comment = `/*\n@name Query${unnamedQueriesCount}\n`;
        for (let i = 0; i <= lines.length - 1; i += 1) {
          const line = lines[i].trim().replace('/*', '');
          comment += line + '\n';
          if (line.endsWith('*/')) {
            query = lines.slice(i + 1).join('\n');
            break;
          }
        }
        query = `${comment}\n${query}`;
      } else {
        query = `/* @name Query${unnamedQueriesCount} */\n${query}`;
      }
    }

    queries.push(query);
  });

  const asSql = queries.join('\n\n');

  const res = parseSQLFile(asSql);
  return res;
}
