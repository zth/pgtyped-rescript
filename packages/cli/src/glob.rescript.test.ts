import chokidar from 'chokidar';
import { globSync } from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/** Uses chokidar to collect files matching a glob pattern (same as CLI) */
function getMatchedFiles(pattern: string): Promise<string[]> {
  return new Promise((resolve) => {
    const files: string[] = [];
    const watcher = chokidar.watch(pattern, { persistent: false });
    watcher.on('add', (filePath) => files.push(filePath));
    watcher.on('ready', () => {
      watcher.close();
      resolve(files);
    });
  });
}

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

  test('working srcDir pattern finds SQL files', async () => {
    // This is the correct way to specify srcDir
    const srcDirPattern = path.join(testDir, 'src');
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(1);
    expect(files[0]).toContain('users.sql');
  });

  test('parentheses syntax works with chokidar (extglob)', async () => {
    // Chokidar (via picomatch) supports extglob patterns like (src|__tests__)
    // This pattern means "src OR __tests__"
    const srcDirPattern = `${testDir}/(src|__tests__)`;
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    // Chokidar finds files in both directories
    expect(files.length).toBe(2);
  });

  test('brace syntax also works for multiple directories', async () => {
    // Both brace syntax {a,b} and extglob (a|b) work with chokidar
    const srcDirPattern = `${testDir}/{src,__tests__}`;
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(2);
  });

  test('srcDir with embedded wildcards still works', async () => {
    // The user's config had srcDir: "./(src|__tests__)/**/*"
    // Even with **/* in srcDir, chokidar handles it
    const srcDirWithWildcard = `${testDir}/(src|__tests__)/**/*`;
    const include = '**/*.sql';
    const pattern = `${srcDirWithWildcard}/**/${include}`;

    // Pattern becomes complex but chokidar handles it
    const files = await getMatchedFiles(pattern);
    expect(files.length).toBe(2);
  });

  describe('glob vs chokidar behavior difference', () => {
    test('glob does NOT support parentheses extglob syntax', () => {
      // This documents why we switched from glob to chokidar
      const srcDirPattern = `${testDir}/(src|__tests__)`;
      const include = '**/*.sql';
      const pattern = `${srcDirPattern}/**/${include}`;

      // glob treats (src|__tests__) as a literal directory name
      const files = globSync(pattern);
      expect(files.length).toBe(0);
    });

    test('chokidar DOES support parentheses extglob syntax', async () => {
      const srcDirPattern = `${testDir}/(src|__tests__)`;
      const include = '**/*.sql';
      const pattern = `${srcDirPattern}/**/${include}`;

      // chokidar interprets (src|__tests__) as "src OR __tests__"
      const files = await getMatchedFiles(pattern);
      expect(files.length).toBe(2);
    });
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
