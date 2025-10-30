import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LIST_PRODUCT_FRAGMENT,
  GET_ALL_PRODUCTS_QUERY,
  GET_PRODUCTS_EXISTS
} from '@/lib/api/operations/product.operations';
import { getFragmentData, type ProductListInput } from '@/lib/api/types';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useGetProducts = (input?: ProductListInput) => {
  const { data, isLoading, isRefetching, refetch } = useGqlQuery(GET_ALL_PRODUCTS_QUERY, {
    variables: { input },
    key: [ProductCacheKeys.Products]
  });

  const { data: productsCount, isLoading: isLoadingProductsCount } = useGqlQuery(
    GET_PRODUCTS_EXISTS,
    { key: [ProductCacheKeys.ProductsCount] }
  );

  const products =
    data?.products?.items.map(p => getFragmentData(COMMON_LIST_PRODUCT_FRAGMENT, p)) ?? [];

  return {
    products,
    pagination: { count: data?.products?.count, pageInfo: data?.products?.pageInfo },
    isLoading: isLoading || isLoadingProductsCount,
    hasNoProducts: !productsCount?.products.count,
    isRefetching,
    refetch
  };
};
