import { useMemo } from 'react';

import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LIST_PRODUCT_FRAGMENT,
  GET_ALL_PRODUCTS_QUERY
} from '@/lib/api/operations/product.operations';
import { getFragmentData, type ProductListInput } from '@/lib/api/types';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useGetProducts = (input?: ProductListInput) => {
  const result = useGqlQuery(GET_ALL_PRODUCTS_QUERY, {
    variables: { input },
    key: [ProductCacheKeys.All]
  });

  const products = useMemo(
    () =>
      result.data?.products?.items.map(p => getFragmentData(COMMON_LIST_PRODUCT_FRAGMENT, p)) ?? [],
    [result.data]
  );
  const { count, pageInfo } = result.data?.products ?? {};

  return {
    ...result,
    products,
    pagination: { count, pageInfo }
  };
};
