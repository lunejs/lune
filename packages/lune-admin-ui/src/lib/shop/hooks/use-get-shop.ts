import { useMemo } from 'react';

import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COMMON_SHOP_FRAGMENT, GET_SHOP_BY_ID_QUERY } from '@/lib/api/operations/shop.operations';

import { ShopQueryKeys } from './query-keys';

export const useGetShop = (id: string) => {
  const { data, isLoading } = useGqlQuery(GET_SHOP_BY_ID_QUERY, {
    variables: { id },
    key: [ShopQueryKeys.Shop(id)]
  });

  const shop = useMemo(() => getFragmentData(COMMON_SHOP_FRAGMENT, data?.shop), [data?.shop]);

  return {
    shop: shop ?? null,
    isLoading
  };
};
