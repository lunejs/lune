import { graphql } from '../codegen';

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
