import { graphql } from '../codegen';

export const COMMON_ORDER_FRAGMENT = graphql(`
  fragment CommonOrder on Order {
    id
    code
    state
    total
    subtotal
    totalQuantity
    placedAt
    customer {
      id
      firstName
      lastName
      email
    }
    lines {
      count
    }
    fulfillment {
      type
    }
  }
`);

export const GET_ALL_ORDERS_QUERY = graphql(`
  query GetAllOrders($input: OrderListInput) {
    orders(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonOrder
      }
    }
  }
`);

export const COUNT_ORDERS_QUERY = graphql(`
  query CountOrders {
    orders {
      count
    }
  }
`);
