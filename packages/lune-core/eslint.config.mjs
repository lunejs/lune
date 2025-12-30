// @ts-check
import luneConfig from '@lunejs/eslint-config';

export default [
  ...luneConfig,
  {
    ignores: ['**/seed/**']
  }
];
