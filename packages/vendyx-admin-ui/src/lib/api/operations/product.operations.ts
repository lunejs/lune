import { graphql } from '../codegen';

export const COMMON_PRODUCT_FRAGMENT = graphql(`
  fragment CommonProduct on Product {
    id
    createdAt
    name
    description
    slug
    enabled
    minSalePrice
    variants {
      items {
        id
        salePrice
        sku
        stock
        comparisonPrice
        costPerUnit
        requiresShipping
        weight
        dimensions {
          length
          width
          height
        }
        optionValues {
          id
          name
        }
        assets {
          items {
            id
            source
          }
        }
      }
    }
    options {
      id
      name
      values {
        id
        name
      }
    }
    assets {
      items {
        id
        source
        order
      }
    }
  }
`);

export const COMMON_LIST_PRODUCT_FRAGMENT = graphql(`
  fragment CommonListProduct on Product {
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
`);

export const GET_ALL_PRODUCTS_QUERY = graphql(`
  query GetProducts($input: ProductListInput) {
    products(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonListProduct
      }
    }
  }
`);

export const GET_PRODUCTS_EXISTS = graphql(`
  query GetProductsExists {
    products(input: { take: 1 }) {
      count
    }
  }
`);

export const GET_PRODUCT_BY_ID_QUERY = graphql(`
  query GetProduct($id: ID) {
    product(id: $id) {
      ...CommonProduct
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

export const REMOVE_PRODUCT_MUTATION = graphql(`
  mutation RemoveProducts($ids: [ID!]!) {
    softRemoveProducts(ids: $ids)
  }
`);
