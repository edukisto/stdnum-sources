import type { JestConfigWithTsJest } from 'ts-jest';
import { defaultsESM } from 'ts-jest/presets';

/**
 * This file will be transformed by `ts-node`.
 * `ts-node` is configured in `tsconfig.json`.
 *
 * Set `verbatimModuleSyntax` to `false` in `tsconfig.json`.
 */
const config: JestConfigWithTsJest = {
  ...defaultsESM,

  errorOnDeprecated: true,

  injectGlobals: false,

  /**
   * The most commonly used extensions should be listed first.
   * `js` must be included.
   */
  moduleFileExtensions: [
    'ts',
    'js',
  ],

  /**
   * Set `esModuleInterop` to `true` in `tsconfig.json`.
   * @see {@link https://github.com/kulshekhar/ts-jest/issues/1057/}
   */
  moduleNameMapper: {
    '^(.+)\\.js$': '$1',
  },

  /** Set `allowJs` to `true` in `tsconfig.json`. */
  // preset: 'ts-jest/presets/js-with-ts-esm',

  testRegex: /\.test\.ts$/.source,

  transform: {
    '^.+\\.[jt]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
};

export default config;
