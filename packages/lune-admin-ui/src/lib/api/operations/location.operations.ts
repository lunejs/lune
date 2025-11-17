import { graphql } from '../codegen';

export const COMMON_LOCATION_FRAGMENT = graphql(`
  fragment CommonLocation on Location {
    id
    name
    createdAt
    enabled
    streetLine1
    streetLine2
    city
    phoneNumber
    postalCode
    country {
      id
      name
    }
    state {
      id
      name
    }
    inStorePickup {
      isAvailable
      instructions
    }
  }
`);

export const COMMON_LIST_LOCATION_FRAGMENT = graphql(`
  fragment CommonListLocation on Location {
    id
    name
    enabled
    streetLine1
    city
    postalCode
    inStorePickup {
      isAvailable
    }
    country {
      name
    }
    state {
      name
    }
  }
`);

export const GET_ALL_LOCATIONS_QUERY = graphql(`
  query GetAllLocations {
    locations {
      items {
        ...CommonListLocation
      }
    }
  }
`);

export const GET_LOCATION_BY_ID_QUERY = graphql(`
  query GetLocationById($id: ID!) {
    location(id: $id) {
      ...CommonLocation
    }
  }
`);

export const CREATE_LOCATION_MUTATION = graphql(`
  mutation CreateLocation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      apiErrors {
        code
        message
      }
      location {
        id
      }
    }
  }
`);

export const UPDATE_LOCATION_MUTATION = graphql(`
  mutation UpdateLocation($id: ID!, $input: UpdateLocationInput!) {
    updateLocation(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      location {
        id
      }
    }
  }
`);

export const REMOVE_LOCATION_MUTATION = graphql(`
  mutation RemoveLocation($id: ID!) {
    removeLocation(id: $id)
  }
`);

export const UPDATE_IN_STORE_PICKUP_PREFERENCE_MUTATION = graphql(`
  mutation UpdateInStorePickupPreferences(
    $locationId: ID!
    $input: UpdateInStorePickupPreferencesInput!
  ) {
    updateInStorePickupPreferences(locationId: $locationId, input: $input) {
      id
    }
  }
`);
