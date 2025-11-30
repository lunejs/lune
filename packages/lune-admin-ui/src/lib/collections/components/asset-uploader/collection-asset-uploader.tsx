import type { CommonCollectionFragment } from '@/lib/api/types';
import { AssetUploader } from '@/shared/components/asset-uploader/asset-uploader';

import { useCollectionDetailsFormContext } from '../collection-details/use-form/use-form';

import { useCollectionAssetUploader } from './use-asset-uploader';

export const CollectionAssetUploader = ({ collection }: Props) => {
  const form = useCollectionDetailsFormContext();

  const { updateCollectionAssets } = useCollectionAssetUploader();

  return (
    <AssetUploader
      max={1}
      defaultAssets={collection?.assets.items ?? []}
      persistenceMode={!!collection}
      onAssetsChange={assets => {
        if (!collection) {
          form.setValue('image', assets.map(({ id }) => id)[0]);
          return;
        }

        updateCollectionAssets(
          collection,
          assets.map(({ id }) => id)
        );
      }}
    />
  );
};

type Props = {
  collection?: CommonCollectionFragment | null;
};
