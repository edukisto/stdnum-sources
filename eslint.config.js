// @ts-check

// import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import ts from 'typescript-eslint';

const stylistic = stylisticPlugin.configs.customize({
  flat: true,
  quoteProps: 'as-needed',
  semi: true,
});

// const ts2 = ts.config(
//   ts.configs.strictTypeChecked,
//   ts.configs.stylisticTypeChecked,
//   {
//   },
// );

//  *  | import('@stylistic/eslint-plugin')}
//  * import('typescript-eslint').Config}

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  {
    ignores: [
      '*',
      '!**/*.{js,ts,tsx}',
      '!src/',
      '**/.next/**',
      '**/*.d.ts',
      '**/bin/**',
      '**/coverage/**',
      '**/dist/**',
      '**/out/**',
    ],
  },
  {
    files: [
      '**/*.{js,ts,tsx}',
    ],
    plugins: {
      ...stylistic.plugins,
    },
    rules: {
      // ...js.configs.recommended.rules,
      ...stylistic.rules,
    },
  },
  {
    files: [
      '**/*.{ts,tsx}',
    ],
    languageOptions: {
      ...ts.configs.base.languageOptions,
      parserOptions: {
        /** @see {@link https://typescript-eslint.io/getting-started/typed-linting/monorepos/} */
        project: [
          './tsconfig.json',
          './src/*/tsconfig.json',
        ],
        // tsconfigRootDir: import.meta.dirname ?? '.',
      },
    },
    plugins: {
      ...ts.configs.base.plugins,
    },
    rules: {
      ...ts.configs.strictTypeChecked[1].rules,
      ...ts.configs.strictTypeChecked[2].rules,
      ...ts.configs.stylisticTypeChecked[1].rules,
      ...ts.configs.stylisticTypeChecked[2].rules,
    },
  },
];

export default config;
