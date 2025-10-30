import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/api/**/*.gql',
  generates: {
    'src/api/shared/types/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: '/* eslint-disable */'
          }
        }
      ],
      config: {
        contextType: '../context/types#ExecutionContext'
      }
    }
  }
};

export default config;
