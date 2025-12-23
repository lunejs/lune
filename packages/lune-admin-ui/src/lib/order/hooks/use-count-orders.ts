import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COUNT_ORDERS_QUERY } from '@/lib/api/operations/order.operations';
import type { OrderListInput } from '@/lib/api/types';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useCountOrders = (input?: OrderListInput) => {
  const result = useGqlQuery(COUNT_ORDERS_QUERY, {
    key: [OrderCacheKeys.Count],
    variables: { input }
  });

  return {
    count: result.data?.orders.count,
    ...result
  };
};
