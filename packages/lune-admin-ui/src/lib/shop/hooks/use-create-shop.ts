import { queryClient } from '@/app/app';
import { getShopError } from '@/lib/api/errors/shop.errors';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_SHOP_MUTATION } from '@/lib/api/operations/shop.operations';
import type { CreateShopInput, ShopErrorCode } from '@/lib/api/types';
import { setCookie } from '@/shared/cookies';
import { CookiesKeys } from '@/shared/cookies/keys';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ShopQueryKeys } from './query-keys';

export const useCreateShop = () => {
  const { isPending, mutateAsync } = useGqlMutationDEPRECATED(CREATE_SHOP_MUTATION, getShopError);

  const createShop = async (input: CreateShopInput): Promise<ActionResult<ShopErrorCode>> => {
    const { shop, error, errorCode } = await mutateAsync({ input });

    if (error) return { isSuccess: false, error, errorCode };

    setCookie(CookiesKeys.ActiveShop, shop?.id as string, { expires: 30 });
    await queryClient.invalidateQueries({ queryKey: [ShopQueryKeys.Shops] });

    return { isSuccess: true };
  };

  return {
    isLoading: isPending,
    createShop
  };
};
