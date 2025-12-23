import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_TOTAL_AVG_ORDER_VALUE_QUERY } from '@/lib/api/operations/metric.operations';
import type { MetricInput } from '@/lib/api/types';

import { MetricCacheKeys } from '../constants/cache-keys';

export const useGetTotalAvgOrderValue = (input: MetricInput) => {
  const result = useGqlQuery(GET_TOTAL_AVG_ORDER_VALUE_QUERY, {
    key: [MetricCacheKeys.AvgOrderValue],
    variables: { input }
  });

  return {
    totalAvgOrderValue: result.data?.totalAverageOrdersValue,
    isLoadingTotalAvgOrderValue: result.isLoading,
    ...result
  };
};
