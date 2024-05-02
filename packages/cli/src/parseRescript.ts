import { parseSQLFile } from '@pgtyped/parser';
import { SQLParseResult } from '@pgtyped/parser/lib/loader/sql';

export function parseCode(fileContent: string): SQLParseResult {
  if (!fileContent.includes('%sql')) {
    return {
      queries: [],
      events: [],
    };
  }

  // Replace with more robust @rescript/tools CLI usage when that package ships linuxarm64 binary.
  const regex = /%sql(?:\.\w+)?\(`([^`]*)`\)/g;
  let match;
  const queries = [];

  while ((match = regex.exec(fileContent)) !== null) {
    let query = match[1].trim();
    if (!query.endsWith(';')) {
      query += ';';
    }

    if (!query.includes('@name')) {
      // Handle potentially existing doc comment
      if (query.trim().startsWith('/*')) {
        const lines = query.split('\n');

        let comment = `/* @name Query${queries.length + 1}\n`;
        for (let i = 0; i <= lines.length - 1; i += 1) {
          const line = lines[i].trim().replace('/*', '');
          comment += line + '\n';
          if (line.endsWith('*/')) {
            break;
          }
        }
        query = `${comment}\n${query}`;
      } else {
        query = `/* @name Query${queries.length + 1} */\n${query}`;
      }
    }

    queries.push(query);
  }

  const asSql = queries.join('\n\n');

  const res = parseSQLFile(asSql);
  return res;
}
