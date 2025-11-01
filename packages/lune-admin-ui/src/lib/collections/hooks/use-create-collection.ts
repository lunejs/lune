import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_COLLECTION_MUTATION } from '@/lib/api/operations/collection.operations';
import type { LuneAsset } from '@/lib/api/types';
import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';
import type { ActionResult } from '@/shared/utils/result.utils';

import type { CollectionDetailsFormValues } from '../components/collection-details/use-form/use-form';
import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useCreateCollection = () => {
  const { uploadAsset } = useUploadAsset();
  const { mutateAsync: createCollection } = useGqlMutation(CREATE_COLLECTION_MUTATION);

  const exec = async (input: CollectionDetailsFormValues): Promise<CreateCollectionResult> => {
    try {
      let image: Omit<LuneAsset, 'order'> | null = null;

      if (input.image) {
        const result = await uploadAsset([input.image]);

        if (!result.success) {
          return { isSuccess: false, error: 'Could not upload image' };
        }

        image = result.data[0];
      }
      const { id } = await createCollection({
        input: {
          name: input.name,
          contentType: input.contentType,
          description: input.description,
          enabled: input.enabled,
          ...(image && { assets: [{ id: image?.id, order: 0 }] })
        }
      });

      await queryClient.refetchQueries({
        queryKey: [CollectionsCacheKeys.Collections]
      });

      return { isSuccess: true, data: { id } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to create a collection' };
    }
  };

  return {
    createCollection: exec
  };
};

type CreateCollectionResult = ActionResult<string, { id: string }>;
