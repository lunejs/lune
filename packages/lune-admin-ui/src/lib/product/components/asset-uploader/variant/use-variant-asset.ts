import type { CommonVariantFragment } from '@/lib/api/types';
import { useUpdateVariant } from '@/lib/product/hooks/use-update-variant';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useVariantAsset = (productId: string) => {
  const { loading, success, failure } = useLoadingNotification();
  const { updateVariant } = useUpdateVariant(productId);

  const updateVariantAssets = async (variant: CommonVariantFragment, assetIds: string[]) => {
    try {
      loading('Saving...');

      await updateVariant({
        id: variant.id,
        input: {
          assets: [
            ...assetIds.map((newAsset, index) => ({
              id: newAsset,
              order: index
            }))
          ]
        }
      });

      success('Variant updated');
    } catch (error) {
      console.error(error);
      failure('Unable to update variant');
    }
  };

  return {
    updateVariantAssets
  };
};
