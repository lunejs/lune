import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { ADD_CUSTOM_OBJECT_ENTRY_TRANSLATION_MUTATION } from '@/lib/api/operations/custom-object-entry.operations';
import type { AddCustomObjectEntryTranslationInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useAddCustomObjectEntryTranslation = () => {
  const { mutateAsync, isPending } = useGqlMutation(ADD_CUSTOM_OBJECT_ENTRY_TRANSLATION_MUTATION);

  const addTranslation = async (
    id: string,
    input: AddCustomObjectEntryTranslationInput
  ): Promise<ActionResult> => {
    try {
      await mutateAsync({ id, input });

      await queryClient.refetchQueries({
        queryKey: [CustomObjectEntryCacheKeys.UniqueForTranslation(id)]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to add translation' };
    }
  };

  return {
    addCustomObjectEntryTranslation: addTranslation,
    isLoading: isPending
  };
};
