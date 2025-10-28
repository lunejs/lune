import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_COLLECTION_MUTATION } from '@/lib/api/operations/collection.operations';
import type { UpdateCollectionInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useUpdateCollection = () => {
  const { mutateAsync: updateCollection } = useGqlMutation(UPDATE_COLLECTION_MUTATION);

  const exec = async (
    collectionId: string,
    input: UpdateCollectionInput
  ): Promise<CreateCollectionResult> => {
    try {
      await updateCollection({ id: collectionId, input });

      await Promise.all([
        queryClient.refetchQueries({
          queryKey: [CollectionsCacheKeys.Collections]
        }),
        queryClient.refetchQueries({
          queryKey: [CollectionsCacheKeys.Collection(collectionId)]
        })
      ]);

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to create a collection' };
    }
  };

  return {
    updateCollection: exec
  };
};

type CreateCollectionResult = ActionResult;
