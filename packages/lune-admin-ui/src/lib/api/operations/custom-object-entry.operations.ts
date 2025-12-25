import { graphql } from '../codegen';

export const GET_CUSTOM_OBJECT_ENTRY_QUERY = graphql(`
  query GetCustomObjectEntry($id: ID!) {
    customObjectEntry(id: $id) {
      id
      createdAt
      updatedAt
      slug
      values {
        id
        value
        field {
          id
          name
          key
          type
        }
      }
    }
  }
`);

export const GET_CUSTOM_OBJECT_ENTRIES_QUERY = graphql(`
  query GetCustomObjectEntries($definitionId: ID!, $input: ListInput!) {
    customObjectEntries(definitionId: $definitionId, input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        createdAt
        updatedAt
        slug
        values {
          id
          value
          field {
            id
            name
            key
            type
          }
        }
      }
    }
  }
`);

export const CREATE_CUSTOM_OBJECT_ENTRY_MUTATION = graphql(`
  mutation CreateCustomObjectEntry($definitionId: ID!, $input: CreateCustomObjectEntryInput!) {
    createCustomObjectEntry(definitionId: $definitionId, input: $input) {
      id
    }
  }
`);

export const UPDATE_CUSTOM_OBJECT_ENTRY_MUTATION = graphql(`
  mutation UpdateCustomObjectEntry($id: ID!, $input: UpdateCustomObjectEntryInput!) {
    updateCustomObjectEntry(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION = graphql(`
  mutation RemoveCustomObjectEntry($ids: [ID!]!) {
    removeCustomObjectEntry(ids: $ids)
  }
`);

export const GET_CUSTOM_OBJECT_ENTRIES_COUNT_QUERY = graphql(`
  query GetCustomObjectEntriesCount($definitionId: ID!) {
    customObjectEntries(definitionId: $definitionId, input: { take: 1 }) {
      count
    }
  }
`);
