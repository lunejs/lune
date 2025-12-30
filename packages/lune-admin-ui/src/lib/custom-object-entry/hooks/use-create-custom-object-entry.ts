import { LuneLogger } from '@lunejs/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { CREATE_CUSTOM_OBJECT_ENTRY_MUTATION } from '@/lib/api/operations/custom-object-entry.operations';
import type { CreateCustomObjectEntryInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useCreateCustomObjectEntry = () => {
  const { isPending, mutateAsync } = useGqlMutation(CREATE_CUSTOM_OBJECT_ENTRY_MUTATION);

  const createCustomObjectEntry = async (
    definitionId: string,
    input: CreateCustomObjectEntryInput
  ): Promise<ActionResult<string, { id: string }>> => {
    try {
      const result = await mutateAsync({ definitionId, input });

      if (!result.id) {
        return { isSuccess: false, error: GENERIC_ERROR };
      }

      await queryClient.refetchQueries({
        queryKey: [CustomObjectEntryCacheKeys.All]
      });

      return { isSuccess: true, data: { id: result.id } };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    createCustomObjectEntry,
    isLoading: isPending
  };
};
