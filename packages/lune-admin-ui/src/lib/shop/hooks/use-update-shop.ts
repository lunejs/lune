import { queryClient } from '@/app/app';
import { getShopError } from '@/lib/api/errors/shop.errors';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_SHOP_MUTATION } from '@/lib/api/operations/shop.operations';
import type { ShopErrorCode, UpdateShopInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ShopQueryKeys } from './query-keys';

export const useUpdateShop = () => {
  const { isPending, mutateAsync } = useGqlMutationDEPRECATED(UPDATE_SHOP_MUTATION, getShopError);

  const updateShop = async (
    id: string,
    input: UpdateShopInput
  ): Promise<ActionResult<ShopErrorCode>> => {
    const { shop, error, errorCode } = await mutateAsync({ id, input });

    if (error) return { isSuccess: false, error, errorCode };

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [ShopQueryKeys.Shops] }),
      queryClient.invalidateQueries({ queryKey: [ShopQueryKeys.Shop(shop?.id as string)] })
    ]);

    return { isSuccess: true };
  };

  return {
    isLoading: isPending,
    updateShop
  };
};
