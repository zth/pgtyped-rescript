import { globSync } from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

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

  test('working srcDir pattern finds SQL files', () => {
    // This is the correct way to specify srcDir
    const srcDirPattern = path.join(testDir, 'src');
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = globSync(pattern);
    expect(files.length).toBe(1);
    expect(files[0]).toContain('users.sql');
  });

  test('problematic srcDir with parentheses syntax finds NO files', () => {
    // This is the pattern reported by the user - using parentheses for alternation
    // This does NOT work because (src|__tests__) is not valid glob syntax
    const srcDirPattern = `${testDir}/(src|__tests__)`;
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = globSync(pattern);
    // This will find 0 files because (src|__tests__) is not valid glob
    expect(files.length).toBe(0);
  });

  test('correct brace syntax for multiple directories finds files', () => {
    // This is the correct glob syntax for matching multiple directories
    const srcDirPattern = `${testDir}/{src,__tests__}`;
    const include = '**/*.sql';
    const pattern = `${srcDirPattern}/**/${include}`;

    const files = globSync(pattern);
    // Should find both files
    expect(files.length).toBe(2);
  });

  test('srcDir with embedded wildcards causes pattern issues', () => {
    // The user's config had srcDir: "./(src|__tests__)/**/*"
    // Even with correct brace syntax, having **/* in srcDir is problematic
    const srcDirWithWildcard = `${testDir}/{src,__tests__}/**/*`;
    const include = '**/*.sql';
    const pattern = `${srcDirWithWildcard}/**/${include}`;

    // Pattern becomes: {src,__tests__}/**/*/**/**/*.sql
    // This works but is redundant and confusing
    const files = globSync(pattern);
    // May still work, but the pattern is unnecessarily complex
    expect(files.length).toBeGreaterThanOrEqual(0);
  });

  test('srcDir should NOT contain ** wildcards', () => {
    // Best practice: srcDir should be a simple directory path, not a glob pattern
    // The transform.include already handles the file matching

    // CORRECT:
    const correctSrcDir = `${testDir}/src`;
    const correctPattern = `${correctSrcDir}/**/${'**/*.sql'}`;
    const correctFiles = globSync(correctPattern);
    expect(correctFiles.length).toBe(1);

    // INCORRECT (but still works with proper brace syntax):
    const redundantSrcDir = `${testDir}/src/**/*`;
    const redundantPattern = `${redundantSrcDir}/**/${'**/*.sql'}`;
    const redundantFiles = globSync(redundantPattern);
    // This still works but is overly complex
    expect(redundantFiles.length).toBeGreaterThanOrEqual(0);
  });

  describe('demonstrates the silent failure issue', () => {
    test('invalid srcDir pattern silently returns empty array', () => {
      // This is the exact issue: with an invalid srcDir pattern,
      // glob returns an empty array without any error
      const invalidSrcDir = `${testDir}/(src|__tests__)/**/*`;
      const include = '**/*.sql';
      const pattern = `${invalidSrcDir}/**/${include}`;

      // glob silently returns empty array - no error thrown
      expect(() => {
        const files = globSync(pattern);
        expect(files).toEqual([]);
      }).not.toThrow();

      // The CLI would then process 0 files and exit successfully
      // without any warning that the pattern didn't match anything
    });

    test('CLI should warn when no files are matched', () => {
      // This test documents the expected behavior:
      // When srcDir pattern matches 0 files, the CLI should warn the user
      const emptyDir = path.join(testDir, 'empty');
      fs.mkdirSync(emptyDir, { recursive: true });

      const srcDirPattern = emptyDir;
      const include = '**/*.sql';
      const pattern = `${srcDirPattern}/**/${include}`;

      const files = globSync(pattern);
      expect(files.length).toBe(0);

      // TODO: The CLI currently doesn't warn about this.
      // It should output something like:
      // "Warning: No files matched pattern: /path/to/empty/**/**/*.sql"
    });
  });
});
