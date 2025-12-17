import { graphql } from '../codegen';

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
