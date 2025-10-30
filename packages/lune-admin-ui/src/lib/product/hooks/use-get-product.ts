import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_PRODUCT_FRAGMENT,
  GET_PRODUCT_BY_ID_QUERY
} from '@/lib/api/operations/product.operations';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useGetProduct = (id: string) => {
  const { data, isLoading, refetch } = useGqlQuery(GET_PRODUCT_BY_ID_QUERY, {
    variables: { id },
    key: [ProductCacheKeys.Product(id)]
  });

  const product = getFragmentData(COMMON_PRODUCT_FRAGMENT, data?.product);

  return {
    product: product ?? null,
    isLoading,
    refetch
  };
};
