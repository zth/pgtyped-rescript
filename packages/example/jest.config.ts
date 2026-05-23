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
        useESM: true,
      },
    ],
  },
  preset: 'ts-jest/presets/default-esm',
  testRegex: '\\.test\\.js?$',
};

export default config;
