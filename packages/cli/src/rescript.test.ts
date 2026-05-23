import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';

type PoolInstance = {
  options: unknown;
};

type PgTypedBindings = {
  Pg: {
    Pool: {
      make: (config: unknown) => PoolInstance;
    };
  };
};

const currentDir = dirname(fileURLToPath(import.meta.url));
const packageDir = join(currentDir, '..');

const buildPgTypedBindings = () => {
  execFileSync('npx', ['rescript', 'clean'], {
    cwd: packageDir,
    stdio: 'inherit',
  });
  execFileSync('npx', ['rescript'], {
    cwd: packageDir,
    stdio: 'inherit',
  });
};

const loadPgTypedBindings = () => {
  const source = readFileSync(join(currentDir, 'res/PgTyped.js'), 'utf8');

  class Pool {
    public options: unknown;

    public constructor(options: unknown) {
      this.options = options;
    }
  }

  const context = {
    exports: {},
    require: (name: string) => {
      if (name === 'pg') {
        return { Pool };
      }

      throw new Error(`Unexpected require: ${name}`);
    },
  };

  vm.runInNewContext(source, context, { filename: 'PgTyped.js' });

  return context.exports as PgTypedBindings;
};

beforeAll(() => {
  buildPgTypedBindings();
});

test('Pool.make wraps connection strings in a pool config object', () => {
  const pgTyped = loadPgTypedBindings();
  const connectionString = 'postgres://user:password@localhost/database';

  const pool = pgTyped.Pg.Pool.make(connectionString);

  expect(pool.options).toEqual({ connectionString });
});

test('Pool.make passes config objects through unchanged', () => {
  const pgTyped = loadPgTypedBindings();
  const config = {
    connectionString: 'postgres://user:password@localhost/database',
    max: 10,
  };

  const pool = pgTyped.Pg.Pool.make(config);

  expect(pool.options).toBe(config);
});
