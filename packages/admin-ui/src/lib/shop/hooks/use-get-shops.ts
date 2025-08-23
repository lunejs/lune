import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COMMON_LIST_SHOP_FRAGMENT, GET_SHOPS_QUERY } from '@/lib/api/operations/shop.operations';

export const useGetShops = () => {
  const { data, isLoading, error } = useGqlQuery(GET_SHOPS_QUERY);

  console.log({
    errorClient: error
  });

  const shops = data?.shops.items.map(s => getFragmentData(COMMON_LIST_SHOP_FRAGMENT, s)) ?? [];

  return {
    shops,
    isLoading
  };
};
