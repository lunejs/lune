import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useArchiveProduct = () => {
  const { mutateAsync: updateProduct } = useGqlMutation(UPDATE_PRODUCT_MUTATION);

  const exec = async (id: string): Promise<ActionResult> => {
    try {
      await updateProduct({ id, input: { archived: true } });

      await queryClient.refetchQueries({
        queryKey: [ProductCacheKeys.Product(id), ProductCacheKeys.Products]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to archived the products' };
    }
  };

  return {
    archiveProduct: exec
  };
};
