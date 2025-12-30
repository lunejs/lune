import { LuneLogger } from '@lunejs/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION } from '@/lib/api/operations/custom-field-definition.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomFieldDefinitionsCacheKeys } from '../constants/cache-keys';

export const useRemoveCustomFieldDefinition = () => {
  const { isPending, mutateAsync } = useGqlMutation(REMOVE_CUSTOM_FIELD_DEFINITION_MUTATION);

  const removeCustomFieldDefinition = async (id: string): Promise<ActionResult> => {
    try {
      const result = await mutateAsync({ id });

      if (!result) {
        return { isSuccess: false, error: 'Failed to remove custom field definition' };
      }

      await queryClient.refetchQueries({
        queryKey: [CustomFieldDefinitionsCacheKeys.All]
      });

      return { isSuccess: true };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    removeCustomFieldDefinition,
    isLoading: isPending
  };
};
