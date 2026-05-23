import type { Config } from 'jest';

const config: Config = {
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  roots: ['src'],
  moduleNameMapper: {
    '^pgtyped-rescript/src/res/PgTyped\\.js$':
      '<rootDir>/../../packages/cli/src/res/PgTyped.js',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsConfig: {
          module: 'commonjs',
        },
      },
    ],
  },
  testRegex: '\\.test\\.tsx?$',
};

export default config;
