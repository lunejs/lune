import { graphql } from '../codegen';

export const COMMON_CUSTOMER_FRAGMENT = graphql(`
  fragment CommonCustomer on Customer {
    id
    createdAt
    firstName
    lastName
    email
    phoneNumber
    enabled
    totalSpent
    orders(input: { take: 1 }) {
      pageInfo {
        total
      }
      items {
        id
        code
        state
        placedAt
        total
        lines {
          count
        }
        payments {
          state
        }
        fulfillment {
          type
        }
      }
    }
  }
`);

export const COMMON_LIST_CUSTOMER_FRAGMENT = graphql(`
  fragment CommonListCustomer on Customer {
    id
    firstName
    lastName
    email
    enabled
    totalSpent
    orders {
      count
    }
  }
`);

export const GET_CUSTOMER_BY_ID_QUERY = graphql(`
  query GetCustomerByIdQuery($id: ID!) {
    customer(id: $id) {
      ...CommonCustomer
    }
  }
`);

export const GET_ALL_CUSTOMERS_QUERY = graphql(`
  query GetAllCustomers($input: CustomerListInput) {
    customers(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonListCustomer
      }
    }
  }
`);

export const COUNT_CUSTOMERS_QUERY = graphql(`
  query CountCustomers {
    customers {
      count
    }
  }
`);
