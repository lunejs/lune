import type { CommonVariantFragment } from '@/lib/api/types';
import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';
import { useUpdateVariant } from '@/lib/product/hooks/use-update-variant';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useVariantAsset = (productId: string) => {
  const { loading, success, failure } = useLoadingNotification();
  const { uploadAsset } = useUploadAsset();
  const { updateVariant } = useUpdateVariant(productId);

  const upload = async (variant: CommonVariantFragment, files: File[]) => {
    try {
      loading('Uploading...');

      const result = await uploadAsset(files);

      if (!result.success) {
        failure('Unable to upload images');

        return;
      }

      await updateVariant({
        id: variant.id,
        input: {
          assets: [
            ...variant.assets.items.map(asset => ({ id: asset.id, order: asset.order })),
            ...result.data.map((newAsset, index) => ({
              id: newAsset.id,
              order: variant.assets.items.length + index
            }))
          ]
        }
      });

      success('Images uploaded');
    } catch (error) {
      console.error(error);
      failure('Unable to upload images');
    }
  };

  const remove = async (variant: CommonVariantFragment, assetsToRemove: string[]) => {
    try {
      loading('Removing...');

      const newAssets = variant.assets.items
        .filter(asset => !assetsToRemove.includes(asset.id))
        .map((asset, index) => ({ id: asset.id, order: index }));

      await updateVariant({
        id: variant.id,
        input: {
          assets: newAssets
        }
      });

      success('Images removed');
    } catch (error) {
      console.error(error);
      failure('Unable to remove images');
    }
  };

  return {
    upload,
    remove
  };
};
