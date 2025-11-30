import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { UPDATE_COLLECTION_MUTATION } from '@/lib/api/operations/collection.operations';
import type { CommonCollectionFragment } from '@/lib/api/types';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CollectionsCacheKeys } from '../../constants/cache-keys';

export const useCollectionAssetUploader = () => {
  const { loading, success, failure } = useLoadingNotification();
  const { mutateAsync: updateCollection } = useGqlMutation(UPDATE_COLLECTION_MUTATION);

  const updateCollectionAssets = async (
    collection: CommonCollectionFragment,
    assetIds: string[]
  ) => {
    try {
      loading('Saving...');

      await updateCollection({
        id: collection.id,
        input: {
          assets: [
            ...assetIds.map((newAsset, index) => ({
              id: newAsset,
              order: index
            }))
          ]
        }
      });

      await queryClient.refetchQueries({
        queryKey: [CollectionsCacheKeys.Collection(collection.id)]
      });

      success('Collection updated');
    } catch (error) {
      console.error(error);
      failure('Unable to update collection');
    }
  };

  return {
    updateCollectionAssets
  };
};
