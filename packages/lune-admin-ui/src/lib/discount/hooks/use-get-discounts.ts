import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LIST_DISCOUNT_FRAGMENT,
  GET_ALL_DISCOUNTS_QUERY
} from '@/lib/api/operations/discount.operations';
import { type DiscountListInput, getFragmentData } from '@/lib/api/types';

import { DiscountCacheKeys } from '../constants/cache-keys';

export const useGetDiscounts = (input?: DiscountListInput) => {
  const result = useGqlQuery(GET_ALL_DISCOUNTS_QUERY, {
    key: [DiscountCacheKeys.All],
    variables: { input }
  });

  const discounts =
    result.data?.discounts.items.map(d => getFragmentData(COMMON_LIST_DISCOUNT_FRAGMENT, d)) ?? [];
  const { count, pageInfo } = result.data?.discounts ?? {};

  return {
    discounts,
    pagination: { count, pageInfo },
    ...result
  };
};
