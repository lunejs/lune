import { useNavigate } from 'react-router';

import { queryClient } from '@/app/app';
import { getShopError } from '@/lib/api/errors/shop.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_SHOP_MUTATION } from '@/lib/api/operations/shop.operations';
import type { CreateShopInput } from '@/lib/api/types';
import { setCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';

import { ShopQueryKeys } from './query-keys';

export const useCreateShop = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useGqlMutation(CREATE_SHOP_MUTATION, getShopError);

  const createShop = async (input: CreateShopInput) => {
    const { shop, error, errorCode } = await mutateAsync({ input });

    if (error) return { error, errorCode };

    setCookie(CookiesKeys.ActiveShop, shop?.id as string, { expires: 30 });
    await queryClient.invalidateQueries({ queryKey: [ShopQueryKeys.Shops] });

    navigate(`/dashboard`);
  };

  return {
    isLoading: isPending,
    createShop
  };
};
