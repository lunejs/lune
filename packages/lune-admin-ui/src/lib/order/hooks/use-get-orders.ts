import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COMMON_ORDER_FRAGMENT, GET_ALL_ORDERS_QUERY } from '@/lib/api/operations/order.operations';
import { getFragmentData, type OrderListInput } from '@/lib/api/types';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useGetOrders = (input?: OrderListInput) => {
  const result = useGqlQuery(GET_ALL_ORDERS_QUERY, {
    key: [OrderCacheKeys.all],
    variables: { input }
  });

  const orders =
    result.data?.orders.items.map(o => getFragmentData(COMMON_ORDER_FRAGMENT, o)) ?? [];
  const { count, pageInfo } = result.data?.orders ?? {};

  return {
    orders,
    pagination: { count, pageInfo },
    ...result
  };
};
