import { graphql } from '../codegen';

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
