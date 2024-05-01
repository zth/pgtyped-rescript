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
    queries.push(query);
  }

  const asSql = queries.join('\n\n');

  const res = parseSQLFile(asSql);
  return res;
}
