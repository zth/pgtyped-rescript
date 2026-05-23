import { parseSQLFile } from '@pgtyped/parser';
import { SQLParseResult } from '@pgtyped/parser/lib/loader/sql';
import cp from 'child_process';
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);

function getRescriptToolsPath(): string {
  const packageJsonPath = require.resolve('rescript/package.json');
  return path.join(path.dirname(packageJsonPath), 'cli', 'rescript-tools.js');
}

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

  const content: Array<{ contents: string }> = JSON.parse(
    cp
      .execFileSync(getRescriptToolsPath(), [
        'extract-embedded',
        ['sql', 'sql.one', 'sql.expectOne', 'sql.many', 'sql.execute'].join(
          ',',
        ),
        fileName,
      ])
      .toString(),
  );

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
