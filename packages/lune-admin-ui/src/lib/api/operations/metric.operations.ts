import { graphql } from '../codegen';

export const GET_TOTAL_SALES_QUERY = graphql(`
  query totalSales($input: MetricInput!) {
    totalSales(input: $input) {
      total
      metrics {
        key
        value
      }
    }
  }
`);

export const GET_TOTAL_ORDERS_QUERY = graphql(`
  query GetTotalOrder($input: MetricInput!) {
    totalOrders(input: $input) {
      total
      metrics {
        key
        value
      }
    }
  }
`);

export const GET_TOTAL_NEW_CUSTOMERS_QUERY = graphql(`
  query GetTotalNewCustomer($input: MetricInput!) {
    totalNewCustomers(input: $input) {
      total
      metrics {
        key
        value
      }
    }
  }
`);

export const GET_TOTAL_AVG_ORDER_VALUE_QUERY = graphql(`
  query GetTotalAvgOrderValue($input: MetricInput!) {
    totalAverageOrdersValue(input: $input) {
      total
      metrics {
        key
        value
      }
    }
  }
`);
