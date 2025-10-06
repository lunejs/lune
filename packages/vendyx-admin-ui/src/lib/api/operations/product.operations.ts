import { graphql } from '../codegen';

export const GET_ALL_PRODUCTS_QUERY = graphql(`
  query GetProducts($input: ProductListInput) {
    products(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        createdAt
        name
        slug
        enabled
        minSalePrice
        variants {
          items {
            id
            sku
            stock
            salePrice
          }
        }
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
      }
    }
  }
`);

export const CREATE_PRODUCT_MUTATION = graphql(`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`);

export const UPDATE_PRODUCT_MUTATION = graphql(`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
    }
  }
`);
