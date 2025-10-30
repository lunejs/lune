import type { CommonProductFragment } from '@/lib/api/types';
import { Dropzone } from '@/shared/components/dropzone/dropzone';

import { useProductAsset } from '../../hooks/use-product-asset';
import { useProductDetailsFormContext } from '../product-details/use-form/use-product-details-form';

export const ProductAssetUploader = ({ product }: Props) => {
  const form = useProductDetailsFormContext();

  const { upload, remove } = useProductAsset();

  return (
    <Dropzone
      persistenceMode={!!product}
      previews={product?.assets.items}
      onFilesChange={files => {
        if (!product) {
          form.setValue('images', files);
          return;
        }

        upload(product, files);
      }}
      onPreviewsRemoved={async previews => {
        if (!product) return;

        await remove(
          product,
          previews.map(p => p.id)
        );
      }}
    />
  );
};

type Props = {
  product?: CommonProductFragment | null;
};
