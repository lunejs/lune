import { graphql } from '../codegen';

export const COMMON_CUSTOM_FIELD_DEFINITION_FRAGMENT = graphql(`
  fragment CommonCustomFieldDefinition on CustomFieldDefinition {
    id
    createdAt
    updatedAt
    name
    key
    isList
    appliesToEntity
    type
    metadata
  }
`);

export const GET_CUSTOM_FIELD_DEFINITION_QUERY = graphql(`
  query GetCustomFieldDefinition($id: ID!) {
    customFieldDefinition(id: $id) {
      ...CommonCustomFieldDefinition
    }
  }
`);

export const GET_CUSTOM_FIELD_DEFINITIONS_QUERY = graphql(`
  query GetCustomFieldDefinitions($input: CustomFieldDefinitionListInput) {
    customFieldDefinitions(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonCustomFieldDefinition
      }
    }
  }
`);
