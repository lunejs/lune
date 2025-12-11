import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COUNT_DISCOUNTS_QUERY } from '@/lib/api/operations/discount.operations';

import { DiscountCacheKeys } from '../constants/cache-keys';

export const useCountDiscounts = () => {
  const result = useGqlQuery(COUNT_DISCOUNTS_QUERY, {
    key: [DiscountCacheKeys.Count]
  });

  return {
    count: result.data?.discounts.count,
    ...result
  };
};
