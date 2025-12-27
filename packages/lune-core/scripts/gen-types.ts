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
        contextType: '../context/types#ExecutionContext',
        enumValues: {
          CustomFieldAppliesToEntity:
            '../../../persistence/entities/custom-field-definition#CustomFieldAppliesTo',
          CustomFieldType: '../../../persistence/entities/custom-field-definition#CustomFieldType',
          OrderState: '../../../persistence/entities/order#OrderState',
          FulfillmentState: '../../../persistence/entities/fulfillment#FulfillmentState'
        }
      }
    }
  }
};

export default config;
