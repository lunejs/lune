import type { CommonVariantFragment } from '@/lib/api/types';
import { AssetUploader } from '@/shared/components/asset-uploader/asset-uploader';

import { useVariantAsset } from './use-variant-asset';

export const VariantAssetUploader = ({ productId, variant }: Props) => {
  const { updateVariantAssets } = useVariantAsset(productId);

  return (
    <AssetUploader
      persistenceMode={!!variant}
      defaultAssets={variant?.assets.items}
      onAssetsChange={assets => {
        updateVariantAssets(
          variant,
          assets.map(({ id }) => id)
        );
      }}
    />
  );
};

type Props = {
  productId: string;
  variant: CommonVariantFragment;
};
