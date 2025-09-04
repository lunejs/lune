// @ts-check
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...tseslint.config(tseslint.configs.strict, tseslint.configs.stylistic, prettierConfig, {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error',

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-extraneous-class': 'off'
    }
  })
];
