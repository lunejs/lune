import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import type { CommonProductFragment } from '@/lib/api/types';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useProductAsset = () => {
  const { loading, success, failure } = useLoadingNotification();
  const { mutateAsync: updateProduct } = useGqlMutation(UPDATE_PRODUCT_MUTATION);

  const updateAssets = async (product: CommonProductFragment, assetIds: string[]) => {
    try {
      loading('Saving...');

      await updateProduct({
        id: product.id,
        input: {
          assets: [
            ...assetIds.map((newAsset, index) => ({
              id: newAsset,
              order: index
            }))
          ]
        }
      });

      await queryClient.refetchQueries({ queryKey: [ProductCacheKeys.Product(product.id)] });

      success('Product updated');
    } catch (error) {
      console.error(error);
      failure('Unable to update product');
    }
  };

  return {
    updateAssets
  };
};
