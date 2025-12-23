import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_TOTAL_ORDERS_QUERY } from '@/lib/api/operations/metric.operations';
import type { MetricInput } from '@/lib/api/types';

import { MetricCacheKeys } from '../constants/cache-keys';

export const useGetTotalOrders = (input: MetricInput) => {
  const result = useGqlQuery(GET_TOTAL_ORDERS_QUERY, {
    key: [MetricCacheKeys.TotalOrders],
    variables: { input }
  });

  return {
    totalOrders: result.data?.totalOrders,
    isLoadingTotalOrders: result.isLoading,
    ...result
  };
};
