import { graphql } from '../codegen';

export const COMMON_CUSTOM_OBJECT_DEFINITION_FRAGMENT = graphql(`
  fragment CommonCustomObjectDefinition on CustomObjectDefinition {
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
`);

export const GET_CUSTOM_OBJECT_DEFINITION_QUERY = graphql(`
  query GetCustomObjectDefinition($id: ID!) {
    customObjectDefinition(id: $id) {
      ...CommonCustomObjectDefinition
    }
  }
`);

export const GET_CUSTOM_OBJECT_DEFINITIONS_QUERY = graphql(`
  query GetCustomObjectDefinitions($input: CustomObjectDefinitionListInput) {
    customObjectDefinitions(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonCustomObjectDefinition
      }
    }
  }
`);

export const CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION = graphql(`
  mutation CreateCustomObjectDefinition($input: CreateCustomObjectDefinitionInput!) {
    createCustomObjectDefinition(input: $input) {
      customObjectDefinition {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION = graphql(`
  mutation UpdateCustomObjectDefinition($id: ID!, $input: UpdateCustomObjectDefinitionInput!) {
    updateCustomObjectDefinition(id: $id, input: $input) {
      customObjectDefinition {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const REMOVE_CUSTOM_OBJECT_DEFINITION_MUTATION = graphql(`
  mutation RemoveCustomObjectDefinition($id: ID!) {
    removeCustomObjectDefinition(id: $id)
  }
`);
