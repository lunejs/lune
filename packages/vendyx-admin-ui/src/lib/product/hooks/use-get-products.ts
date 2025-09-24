import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_ALL_PRODUCTS_QUERY } from '@/lib/api/operations/product.operations';
import type { ProductListInput } from '@/lib/api/types';

export const useGetProducts = (input?: ProductListInput) => {
  const { data, isLoading, refetch } = useGqlQuery(GET_ALL_PRODUCTS_QUERY, {
    variables: { input }
  });

  const products = data?.products?.items;

  return {
    products,
    pagination: { count: data?.products?.count, pageInfo: data?.products?.pageInfo },
    isLoading,
    refetch
  };
};
