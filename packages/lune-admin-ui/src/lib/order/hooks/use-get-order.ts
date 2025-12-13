import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COMMON_ORDER_FRAGMENT, GET_ORDER_QUERY } from '@/lib/api/operations/order.operations';
import { getFragmentData } from '@/lib/api/types';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useGetOrder = (id: string) => {
  const result = useGqlQuery(GET_ORDER_QUERY, {
    key: [OrderCacheKeys.Unique(id)],
    variables: { id }
  });

  const order = getFragmentData(COMMON_ORDER_FRAGMENT, result.data?.order);

  return {
    order,
    ...result
  };
};
