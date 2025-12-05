import { graphql } from '../codegen';

export const COMMON_DISCOUNT_HANDLER_FRAGMENT = graphql(`
  fragment CommonDiscountHandler on DiscountHandler {
    code
    name
    description
    args
    applicationLevel
  }
`);

export const COMMON_LIST_DISCOUNT_FRAGMENT = graphql(`
  fragment CommonListDiscount on Discount {
    id
    code
    applicationMode
    applicationLevel
    startsAt
    endsAt
    enabled
  }
`);

export const GET_ALL_DISCOUNTS_QUERY = graphql(`
  query GetAllDiscounts($input: DiscountListInput) {
    discounts(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonListDiscount
      }
    }
  }
`);

export const GET_ALL_DISCOUNT_HANDLERS_QUERY = graphql(`
  query GetAllDiscountHandlers {
    discountHandlers {
      ...CommonDiscountHandler
    }
  }
`);

export const CREATE_DISCOUNT_MUTATION = graphql(`
  mutation CreateDiscount($input: CreateDiscountInput!) {
    createDiscount(input: $input) {
      apiErrors {
        code
        message
      }
      discount {
        id
      }
    }
  }
`);

export const UPDATE_DISCOUNT_MUTATION = graphql(`
  mutation UpdateDiscount($id: ID!, $input: UpdateDiscountInput!) {
    updateDiscount(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      discount {
        id
      }
    }
  }
`);

export const REMOVE_DISCOUNT_MUTATION = graphql(`
  mutation RemoveDiscount($ids: [ID!]!) {
    removeDiscounts(ids: $ids)
  }
`);
