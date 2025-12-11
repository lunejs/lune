import { queryClient } from '@/app/app';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_COLLECTION_MUTATION } from '@/lib/api/operations/collection.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import type { CollectionDetailsFormValues } from '../components/collection-details/use-form/use-form';
import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useCreateCollection = () => {
  const { mutateAsync: createCollection } = useGqlMutationDEPRECATED(CREATE_COLLECTION_MUTATION);

  const exec = async (input: CollectionDetailsFormValues): Promise<CreateCollectionResult> => {
    try {
      const { id } = await createCollection({
        input: {
          name: input.name,
          contentType: input.contentType,
          description: input.description,
          enabled: input.enabled,
          ...(input.image && { assets: [{ id: input.image, order: 0 }] })
        }
      });

      await queryClient.refetchQueries({
        queryKey: [CollectionsCacheKeys.All]
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
