import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/admin-api',
  documents: ['./src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/api/codegen/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      },
      config: {
        skipTypename: true
      }
    }
  }
};

export default config;
