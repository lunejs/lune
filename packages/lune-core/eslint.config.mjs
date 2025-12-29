// @ts-check
import luneConfig from '@lune/eslint-config';

export default [
  ...luneConfig,
  {
    ignores: ['**/seed/**']
  }
];
