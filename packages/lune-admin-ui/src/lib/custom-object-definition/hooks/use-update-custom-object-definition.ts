import { LuneLogger } from '@lune/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getCustomObjectDefinitionError } from '@/lib/api/errors/custom-object-definition.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION } from '@/lib/api/operations/custom-object-definition.operations';
import type {
  CustomObjectDefinitionErrorCode,
  UpdateCustomObjectDefinitionInput
} from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomObjectDefinitionCacheKeys } from '../constants/cache-keys';

export const useUpdateCustomObjectDefinition = () => {
  const { isPending, mutateAsync } = useGqlMutation(UPDATE_CUSTOM_OBJECT_DEFINITION_MUTATION);

  const updateCustomObjectDefinition = async (
    id: string,
    input: UpdateCustomObjectDefinitionInput
  ): Promise<Result> => {
    try {
      const { apiErrors, customObjectDefinition } = await mutateAsync({ id, input });

      if (apiErrors.length) {
        const { error, errorCode } = getCustomObjectDefinitionError(apiErrors);

        return { isSuccess: false, error, errorCode };
      }

      await queryClient.refetchQueries({
        queryKey: [CustomObjectDefinitionCacheKeys.All]
      });
      await queryClient.refetchQueries({
        queryKey: [CustomObjectDefinitionCacheKeys.Unique(id)]
      });

      return { isSuccess: true, data: { id: customObjectDefinition?.id as string } };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    updateCustomObjectDefinition,
    isLoading: isPending
  };
};

type Result = ActionResult<CustomObjectDefinitionErrorCode, { id: string }>;
