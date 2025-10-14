import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import type { CommonProductFragment } from '@/lib/api/types';
import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useProductAsset = () => {
  const { loading, success, failure } = useLoadingNotification();
  const { uploadAsset } = useUploadAsset();
  const { mutateAsync: updateProduct } = useGqlMutation(UPDATE_PRODUCT_MUTATION);

  const upload = async (product: CommonProductFragment, files: File[]) => {
    try {
      loading('Uploading');

      const result = await uploadAsset(files);

      if (!result.success) {
        failure('Unable to upload images');

        return;
      }

      await updateProduct({
        id: product.id,
        input: {
          assets: [
            ...product.assets.items.map(asset => ({ id: asset.id, order: asset.order })),
            ...result.data.map((newAsset, index) => ({
              id: newAsset.id,
              order: product.assets.items.length + index
            }))
          ]
        }
      });

      await queryClient.refetchQueries({ queryKey: [ProductCacheKeys.Product(product.id)] });

      success('Images uploaded');
    } catch (error) {
      console.error(error);
      failure('Unable to upload images');
    }
  };

  const remove = async (product: CommonProductFragment, assetsToRemove: string[]) => {
    try {
      loading('Uploading');

      const newAssets = product.assets.items
        .filter(asset => !assetsToRemove.includes(asset.id))
        .map((asset, index) => ({ id: asset.id, order: index }));

      await updateProduct({
        id: product.id,
        input: {
          assets: newAssets
        }
      });

      await queryClient.refetchQueries({ queryKey: [ProductCacheKeys.Product(product.id)] });

      success('Images uploaded');
    } catch (error) {
      console.error(error);
      failure('Unable to upload images');
    }
  };

  return {
    upload,
    remove
  };
};
