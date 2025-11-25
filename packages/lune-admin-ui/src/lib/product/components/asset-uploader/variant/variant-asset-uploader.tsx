import type { CommonVariantFragment } from '@/lib/api/types';
import { Dropzone } from '@/shared/components/dropzone/dropzone';

import { useVariantAsset } from './use-variant-asset';

export const VariantAssetUploader = ({ productId, variant }: Props) => {
  const { upload, remove } = useVariantAsset(productId);

  return (
    <Dropzone
      persistenceMode={!!variant}
      previews={variant?.assets.items}
      onFilesChange={files => {
        upload(variant, files);
      }}
      onPreviewsRemoved={async previews => {
        if (!variant) return;

        await remove(
          variant,
          previews.map(p => p.id)
        );
      }}
    />
  );
};

type Props = {
  productId: string;
  variant: CommonVariantFragment;
};
