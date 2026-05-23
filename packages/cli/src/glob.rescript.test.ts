import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { getMatchedFiles } from './glob.js';

describe('srcDir glob pattern matching', () => {
  let testDir: string;
  let srcDir: string;
  let testsDir: string;

  beforeEach(() => {
    // Create a temporary directory structure
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pgtyped-test-'));
    srcDir = path.join(testDir, 'src');
    testsDir = path.join(testDir, '__tests__');

    // Create directories
    fs.mkdirSync(srcDir, { recursive: true });
    fs.mkdirSync(testsDir, { recursive: true });
    fs.mkdirSync(path.join(srcDir, 'queries'), { recursive: true });
    fs.mkdirSync(path.join(testsDir, 'queries'), { recursive: true });

    // Create test SQL files
    fs.writeFileSync(
      path.join(srcDir, 'queries', 'users.sql'),
      '/* @name GetUsers */\nSELECT * FROM users;',
    );
    fs.writeFileSync(
      path.join(testsDir, 'queries', 'test.sql'),
      '/* @name GetTestData */\nSELECT * FROM test_data;',
    );
  });

  afterEach(() => {
    // Cleanup
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  test('simple srcDir pattern finds SQL files', async () => {
    const srcDirPattern = path.join(testDir, 'src');
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(1);
    expect(files[0]).toContain('users.sql');
  });

  test('parentheses extglob syntax (src|__tests__) finds files in both directories', async () => {
    const srcDirPattern = `${testDir}/(src|__tests__)`;
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(2);
  });

  test('brace syntax {src,__tests__} finds files in both directories', async () => {
    const srcDirPattern = `${testDir}/{src,__tests__}`;
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(2);
  });

  test('srcDir with embedded wildcards (src|__tests__)/**/* works', async () => {
    // The user's config had srcDir: "./(src|__tests__)/**/*"
    const srcDirWithWildcard = `${testDir}/(src|__tests__)/**/*`;
    const include = '**/*.sql';
    const pattern = `${srcDirWithWildcard}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(2);
  });

  test('empty directory returns empty array without error', async () => {
    const emptyDir = path.join(testDir, 'empty');
    fs.mkdirSync(emptyDir, { recursive: true });

    const srcDirPattern = emptyDir;
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(0);
  });
});
