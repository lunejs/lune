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
    order
    referenceTarget {
      id
      createdAt
      updatedAt
      name
      key
      displayField {
        id
        createdAt
        updatedAt
        name
        key
        isList
        appliesToEntity
        type
        metadata
        order
      }
      fields {
        id
        createdAt
        updatedAt
        name
        key
        isList
        appliesToEntity
        type
        metadata
        order
      }
    }
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

export const CREATE_CUSTOM_FIELD_DEFINITION_MUTATION = graphql(`
  mutation CreateCustomFieldDefinition($input: CreateCustomFieldInput!) {
    createCustomFieldDefinition(input: $input) {
      customFieldDefinition {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION = graphql(`
  mutation UpdateCustomFieldDefinition($id: ID!, $input: UpdateCustomFieldInput!) {
    updateCustomFieldDefinition(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION = graphql(`
  mutation RemoveCustomFieldDefinition($id: ID!) {
    removeCustomFieldDefinition(id: $id)
  }
`);
