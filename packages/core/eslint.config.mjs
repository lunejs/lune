// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config(
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-extraneous-class': 'off'
    }
  }
  // {
  //   rules: {
  //     '@typescript-eslint/no-extraneous-class': 'off',
  //     '@typescript-eslint/consistent-type-definitions': 'off',
  //     '@typescript-eslint/no-empty-function': 'off',
  //     '@typescript-eslint/no-empty-object-type': 'off',
  //   },
  // }
);
