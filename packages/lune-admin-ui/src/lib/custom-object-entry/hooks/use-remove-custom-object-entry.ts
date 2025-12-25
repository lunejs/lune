import { LuneLogger } from '@lune/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION } from '@/lib/api/operations/custom-object-entry.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useRemoveCustomObjectEntry = () => {
  const { isPending, mutateAsync } = useGqlMutation(REMOVE_CUSTOM_OBJECT_ENTRY_MUTATION);

  const removeCustomObjectEntry = async (ids: string[]): Promise<ActionResult> => {
    try {
      const result = await mutateAsync({ ids });

      if (!result) {
        return { isSuccess: false, error: 'Failed to remove custom object entry' };
      }

      await queryClient.refetchQueries({
        queryKey: [CustomObjectEntryCacheKeys.All]
      });

      return { isSuccess: true };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    removeCustomObjectEntry,
    isLoading: isPending
  };
};
