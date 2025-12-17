import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COUNT_CUSTOMERS_QUERY } from '@/lib/api/operations/customer.operations';

import { CustomerCacheKeys } from '../constants/cache-keys';

export const useCountCustomers = () => {
  const result = useGqlQuery(COUNT_CUSTOMERS_QUERY, {
    key: [CustomerCacheKeys.Count]
  });

  return {
    count: result.data?.customers.count,
    ...result
  };
};
