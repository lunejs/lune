import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_TOTAL_NEW_CUSTOMERS_QUERY } from '@/lib/api/operations/metric.operations';
import type { MetricInput } from '@/lib/api/types';

import { MetricCacheKeys } from '../constants/cache-keys';

export const useGetTotalNewCustomers = (input: MetricInput) => {
  const result = useGqlQuery(GET_TOTAL_NEW_CUSTOMERS_QUERY, {
    key: [MetricCacheKeys.TotalNewCustomers],
    variables: { input }
  });

  return {
    totalNewCustomers: result.data?.totalNewCustomers,
    isLoadingTotalNewCustomers: result.isLoading,
    ...result
  };
};
