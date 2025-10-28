import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_COLLECTION_MUTATION } from '@/lib/api/operations/collection.operations';
import type { CreateCollectionInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useCreateCollection = () => {
  const { mutateAsync: createCollection } = useGqlMutation(CREATE_COLLECTION_MUTATION);

  const exec = async (input: CreateCollectionInput): Promise<CreateCollectionResult> => {
    try {
      const { id } = await createCollection({ input });

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
