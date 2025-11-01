import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { ADD_TRANSLATION_TO_COLLECTION } from '@/lib/api/operations/collection.operations';
import type { CollectionTranslationInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useAddCollectionTranslation = () => {
  const { mutateAsync: addTranslation } = useGqlMutation(ADD_TRANSLATION_TO_COLLECTION);

  const exec = async (id: string, input: CollectionTranslationInput): Promise<ActionResult> => {
    try {
      await addTranslation({ id, input });

      await queryClient.refetchQueries({
        queryKey: [CollectionsCacheKeys.CollectionForTranslation(id)]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to add translation' };
    }
  };

  return {
    addCollectionTranslation: exec
  };
};
