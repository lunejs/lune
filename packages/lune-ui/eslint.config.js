import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

import luneConfig from '@lune/eslint-config';

export default [
  ...luneConfig,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    rules: {
      'react-refresh/only-export-components': 'off'
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
];
