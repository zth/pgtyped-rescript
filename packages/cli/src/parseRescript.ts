import { parseSQLFile } from '@pgtyped/parser';
import { SQLParseResult } from '@pgtyped/parser/lib/loader/sql';

export function parseCode(
  fileContent: string,
  _fileName: string,
): SQLParseResult {
  if (!fileContent.includes('%sql')) {
    return {
      queries: [],
      events: [],
    };
  }

  const regex = /%sql(?:\.\w+)?\(`([^`]*)`\)/g;
  let match;
  let queries = [];

  while ((match = regex.exec(fileContent)) !== null) {
    queries.push(match[1]);
  }

  const asSql = queries.join('\n\n');

  const res = parseSQLFile(asSql);
  return res;
}
