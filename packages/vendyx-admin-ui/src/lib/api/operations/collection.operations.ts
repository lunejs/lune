import { graphql } from '../codegen';

export const COMMON_COLLECTION_FRAGMENT = graphql(`
  fragment CommonCollection on Collection {
    id
    name
    description
    enabled
    contentType
    order
    products {
      items {
        id
      }
    }
    assets(input: { take: 1 }) {
      items {
        id
        name
        source
      }
    }
  }
`);

export const COMMON_LIST_COLLECTION_FRAGMENT = graphql(`
  fragment CommonListCollection on Collection {
    id
    name
    slug
    enabled
    contentType
    assets(input: { take: 1 }) {
      items {
        id
        source
      }
    }
    subCollections {
      count
      items {
        id
        name
      }
    }
    products {
      count
      items {
        id
        name
      }
    }
  }
`);

export const GET_ALL_COLLECTIONS_QUERY = graphql(`
  query GetAllCollections($input: CollectionListInput) {
    collections(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonListCollection
      }
    }
  }
`);

export const GET_COLLECTIONS_EXISTS = graphql(`
  query GetCollectionsExists {
    collections(input: { take: 1 }) {
      count
    }
  }
`);

export const GET_COLLECTION_BY_ID_QUERY = graphql(`
  query GetCollection($id: ID) {
    collection(id: $id) {
      ...CommonCollection
    }
  }
`);

export const CREATE_COLLECTION_MUTATION = graphql(`
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      id
    }
  }
`);

export const UPDATE_COLLECTION_MUTATION = graphql(`
  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {
    updateCollection(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_COLLECTIONS_MUTATION = graphql(`
  mutation RemoveCollections($ids: [ID!]!) {
    removeCollections(ids: $ids)
  }
`);

export const ADD_TRANSLATION_TO_COLLECTION = graphql(`
  mutation AddCollectionTranslationMutation($id: ID!, $input: CollectionTranslationInput!) {
    addCollectionTranslation(id: $id, input: $input) {
      id
    }
  }
`);
