import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_DISCOUNT_FRAGMENT,
  GET_DISCOUNT_BY_ID_QUERY
} from '@/lib/api/operations/discount.operations';
import { getFragmentData } from '@/lib/api/types';

import { DiscountCacheKeys } from '../constants/cache-keys';

export const useGetDiscount = (id: string) => {
  const result = useGqlQuery(GET_DISCOUNT_BY_ID_QUERY, {
    key: [DiscountCacheKeys.Unique(id)],
    variables: { id }
  });

  const discount = getFragmentData(COMMON_DISCOUNT_FRAGMENT, result.data?.discount);

  return {
    discount,
    ...result
  };
};
