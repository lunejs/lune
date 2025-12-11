import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COUNT_ORDERS_QUERY } from '@/lib/api/operations/order.operations';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useCountOrders = () => {
  const result = useGqlQuery(COUNT_ORDERS_QUERY, {
    key: [OrderCacheKeys.count]
  });

  return {
    count: result.data?.orders.count,
    ...result
  };
};
