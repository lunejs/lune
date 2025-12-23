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
