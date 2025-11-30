import type { CommonProductFragment } from '@/lib/api/types';
import { AssetUploader } from '@/shared/components/asset-uploader/asset-uploader';

import { useProductAsset } from '../../hooks/use-product-asset';
import { useProductDetailsFormContext } from '../product-details/use-form/use-product-details-form';

export const ProductAssetUploader = ({ product }: Props) => {
  const form = useProductDetailsFormContext();

  const { updateAssets } = useProductAsset();

  return (
    <AssetUploader
      persistenceMode={!!product}
      defaultAssets={product?.assets.items ?? []}
      onAssetsChange={assets => {
        if (!product) {
          form.setValue(
            'images',
            assets.map(({ id }) => id)
          );
          return;
        }

        updateAssets(
          product,
          assets.map(a => a.id)
        );
      }}
    />
  );
};

type Props = {
  product?: CommonProductFragment | null;
};
