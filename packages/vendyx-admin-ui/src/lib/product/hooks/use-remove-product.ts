import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { REMOVE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useRemoveProducts = () => {
  const { mutateAsync } = useGqlMutation(REMOVE_PRODUCT_MUTATION);

  const removeProducts = async (ids: string[]): Promise<ActionResult> => {
    try {
      const isSuccess = await mutateAsync({ ids });

      if (!isSuccess) {
        return { isSuccess: false, error: 'Failed to remove products' };
      }

      await Promise.all([
        queryClient.refetchQueries({
          queryKey: [ProductCacheKeys.Products]
        }),
        queryClient.refetchQueries({
          queryKey: [ProductCacheKeys.ProductsCount]
        })
      ]);

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to remove products' };
    }
  };

  return {
    removeProducts
  };
};
