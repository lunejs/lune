import { graphql } from '../codegen';

export const COMMON_SHOP_FRAGMENT = graphql(`
  fragment CommonShop on Shop {
    id
    name
    slug
    email
    logo
    socials {
      facebook
      twitter
      instagram
    }
    phoneNumber
    storefrontApiKey
  }
`);

export const COMMON_LIST_SHOP_FRAGMENT = graphql(`
  fragment CommonListShop on Shop {
    id
    name
    slug
  }
`);

export const GET_SHOPS_QUERY = graphql(`
  query getShops {
    shops {
      items {
        ...CommonListShop
      }
    }
  }
`);

export const GET_SHOP_BY_ID_QUERY = graphql(`
  query Shop($id: ID!) {
    shop(id: $id) {
      ...CommonShop
    }
  }
`);

export const CREATE_SHOP_MUTATION = graphql(`
  mutation CreateShop($input: CreateShopInput!) {
    createShop(input: $input) {
      apiErrors {
        message
        code
      }
      shop {
        id
        slug
      }
    }
  }
`);

export const UPDATE_SHOP_MUTATION = graphql(`
  mutation UpdateShop($id: ID!, $input: UpdateShopInput!) {
    updateShop(id: $id, input: $input) {
      apiErrors {
        message
        code
      }
      shop {
        id
        slug
      }
    }
  }
`);

// export const GENERATE_SHOP_API_KEY_MUTATION = graphql(`
//   mutation GenerateShopApiKey {
//     generateShopApiKey {
//       shop {
//         id
//         slug
//       }
//     }
//   }
// `);
