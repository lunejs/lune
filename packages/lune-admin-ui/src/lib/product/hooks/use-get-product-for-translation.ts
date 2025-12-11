import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_PRODUCT_FOR_TRANSLATION_FRAGMENT,
  GET_PRODUCT_BY_ID_FOR_TRANSLATION_QUERY
} from '@/lib/api/operations/product.operations';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useGetProductForTranslation = (id: string) => {
  const { data, isLoading, isRefetching, refetch } = useGqlQuery(
    GET_PRODUCT_BY_ID_FOR_TRANSLATION_QUERY,
    {
      variables: { id },
      key: [ProductCacheKeys.UniqueForTranslation(id)]
    }
  );

  const product = getFragmentData(COMMON_PRODUCT_FOR_TRANSLATION_FRAGMENT, data?.product);

  return {
    product: product ?? null,
    isLoading,
    isRefetching,
    refetch
  };
};
