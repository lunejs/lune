import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_VARIANT_FRAGMENT,
  GET_PRODUCT_FOR_VARIANTS_QUERY
} from '@/lib/api/operations/product.operations';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useGetProductForVariants = (id: string) => {
  const result = useGqlQuery(GET_PRODUCT_FOR_VARIANTS_QUERY, {
    variables: { id },
    key: [ProductCacheKeys.UniqueForVariants(id)]
  });

  const variants =
    result.data?.product?.variants.items.map(v => getFragmentData(COMMON_VARIANT_FRAGMENT, v)) ??
    [];

  return {
    product: {
      ...result.data?.product,
      variants: {
        items: variants
      }
    },
    ...result
  };
};
