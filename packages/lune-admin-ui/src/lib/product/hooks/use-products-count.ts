import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_PRODUCTS_EXISTS } from '@/lib/api/operations/product.operations';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useProductsCount = () => {
  const { data, ...rest } = useGqlQuery(GET_PRODUCTS_EXISTS, {
    key: [ProductCacheKeys.ProductsCount]
  });

  return {
    count: data?.products.count,
    ...rest
  };
};
