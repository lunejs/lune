import { LuneLogger } from '@lune/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { REMOVE_CUSTOM_OBJECT_DEFINITION_MUTATION } from '@/lib/api/operations/custom-object-definition.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomObjectDefinitionCacheKeys } from '../constants/cache-keys';

export const useRemoveCustomObjectDefinition = () => {
  const { isPending, mutateAsync } = useGqlMutation(REMOVE_CUSTOM_OBJECT_DEFINITION_MUTATION);

  const removeCustomObjectDefinition = async (id: string): Promise<ActionResult> => {
    try {
      const result = await mutateAsync({ id });

      if (!result) return { isSuccess: false, error: 'Failed to remove custom object definition' };

      await queryClient.refetchQueries({
        queryKey: [CustomObjectDefinitionCacheKeys.All]
      });

      return { isSuccess: true };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    removeCustomObjectDefinition,
    isLoading: isPending
  };
};
