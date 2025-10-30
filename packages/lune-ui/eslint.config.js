import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

import vendyxConfig from '@lune/eslint-config';

export default [
  ...vendyxConfig,
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
