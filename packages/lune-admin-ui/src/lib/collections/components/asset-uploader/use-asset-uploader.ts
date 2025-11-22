import { queryClient } from '@/app/app';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_COLLECTION_MUTATION } from '@/lib/api/operations/collection.operations';
import type { CommonCollectionFragment } from '@/lib/api/types';
import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CollectionsCacheKeys } from '../../constants/cache-keys';

export const useCollectionAssetUploader = () => {
  const { loading, success, failure } = useLoadingNotification();
  const { uploadAsset } = useUploadAsset();
  const { mutateAsync: updateCollection } = useGqlMutationDEPRECATED(UPDATE_COLLECTION_MUTATION);

  const upload = async (collection: CommonCollectionFragment, files: File) => {
    try {
      loading('Uploading...');

      const result = await uploadAsset([files]);

      if (!result.success) {
        failure('Unable to upload images');

        return;
      }

      const [image] = result.data;

      await updateCollection({
        id: collection.id,
        input: {
          assets: [{ id: image.id, order: 0 }]
        }
      });

      await queryClient.refetchQueries({
        queryKey: [CollectionsCacheKeys.Collection(collection.id)]
      });

      success('Images uploaded');
    } catch (error) {
      console.error(error);
      failure('Unable to upload images');
    }
  };

  const remove = async (collection: CommonCollectionFragment) => {
    try {
      loading('Removing...');

      await updateCollection({
        id: collection.id,
        input: { assets: [] }
      });

      await queryClient.refetchQueries({
        queryKey: [CollectionsCacheKeys.Collection(collection.id)]
      });

      success('Image removed');
    } catch (error) {
      console.error(error);
      failure('Unable to upload images');
    }
  };

  return {
    upload,
    remove
  };
};
