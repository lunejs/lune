import { LuneLogger } from '@lune/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION } from '@/lib/api/operations/custom-field-definition.operations';
import type { UpdateCustomFieldInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomFieldDefinitionsCacheKeys } from '../constants/cache-keys';

export const useUpdateCustomFieldDefinition = () => {
  const { isPending, mutateAsync } = useGqlMutation(UPDATE_CUSTOM_FIELD_DEFINITION_MUTATION);

  const updateCustomFieldDefinition = async (
    id: string,
    input: UpdateCustomFieldInput
  ): Promise<Result> => {
    try {
      const result = await mutateAsync({ id, input });

      if (!result.id) {
        return { isSuccess: false, error: 'Failed to update custom field definition' };
      }

      await queryClient.refetchQueries({
        queryKey: [CustomFieldDefinitionsCacheKeys.All]
      });
      await queryClient.refetchQueries({
        queryKey: [CustomFieldDefinitionsCacheKeys.Unique(id)]
      });

      return { isSuccess: true, data: { id: result.id } };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    updateCustomFieldDefinition,
    isLoading: isPending
  };
};

type Result = ActionResult<string, { id: string }>;
