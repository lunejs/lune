import type { CommonCollectionFragment } from '@/lib/api/types';
import { AssetUploader } from '@/shared/components/asset-uploader/asset-uploader';

import { useCollectionDetailsFormContext } from '../collection-details/use-form/use-form';

import { useCollectionAssetUploader } from './use-asset-uploader';

export const CollectionAssetUploader = ({ collection }: Props) => {
  const form = useCollectionDetailsFormContext();

  const { upload, remove } = useCollectionAssetUploader();

  return (
    <AssetUploader
      max={1}
      persistenceMode={!!collection}
      previews={collection?.assets.items}
      onFilesChange={files => {
        if (!collection) {
          form.setValue('image', files[0]);
          return;
        }

        upload(collection, files[0]);
      }}
      onPreviewsRemoved={async () => {
        if (!collection) return;

        await remove(collection);
      }}
    />
  );
};

type Props = {
  collection?: CommonCollectionFragment | null;
};
