import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_DISCOUNT_HANDLER_FRAGMENT,
  GET_ALL_DISCOUNT_HANDLERS_QUERY
} from '@/lib/api/operations/discount.operations';
import { getFragmentData } from '@/lib/api/types';

import { DiscountCacheKeys } from '../constants/cache-keys';

export const useGetDiscountHandlers = () => {
  const result = useGqlQuery(GET_ALL_DISCOUNT_HANDLERS_QUERY, {
    key: [DiscountCacheKeys.Handlers]
  });

  const discountHandlers =
    result.data?.discountHandlers.map(d => getFragmentData(COMMON_DISCOUNT_HANDLER_FRAGMENT, d)) ??
    [];

  return {
    discountHandlers,
    ...result
  };
};
