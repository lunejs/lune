import type { CommonCollectionFragment } from '@/lib/api/types';
import { Dropzone } from '@/shared/components/dropzone/dropzone';

import { useCollectionDetailsFormContext } from '../collection-details/use-form/use-form';

import { useCollectionAssetUploader } from './use-asset-uploader';

export const CollectionAssetUploader = ({ collection }: Props) => {
  const form = useCollectionDetailsFormContext();

  const { upload, remove } = useCollectionAssetUploader();

  return (
    <Dropzone
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
