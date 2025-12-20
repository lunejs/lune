import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/**/*.gql',
  generates: {
    'src/paypal/api/types.api.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: '/* eslint-disable */'
          }
        }
      ]
    }
  }
};

export default config;
