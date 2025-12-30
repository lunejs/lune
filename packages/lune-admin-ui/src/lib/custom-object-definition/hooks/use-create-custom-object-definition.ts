import { LuneLogger } from '@lunejs/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getCustomObjectDefinitionError } from '@/lib/api/errors/custom-object-definition.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION } from '@/lib/api/operations/custom-object-definition.operations';
import type {
  CreateCustomObjectDefinitionInput,
  CustomObjectDefinitionErrorCode
} from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomObjectDefinitionCacheKeys } from '../constants/cache-keys';

export const useCreateCustomObjectDefinition = () => {
  const { isPending, mutateAsync } = useGqlMutation(CREATE_CUSTOM_OBJECT_DEFINITION_MUTATION);

  const createCustomObjectDefinition = async (
    input: CreateCustomObjectDefinitionInput
  ): Promise<Result> => {
    try {
      const { apiErrors, customObjectDefinition } = await mutateAsync({ input });

      if (apiErrors.length) {
        const { error, errorCode } = getCustomObjectDefinitionError(apiErrors);

        return { isSuccess: false, error, errorCode };
      }

      await queryClient.refetchQueries({
        queryKey: [CustomObjectDefinitionCacheKeys.All]
      });

      return { isSuccess: true, data: { id: customObjectDefinition?.id as string } };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    createCustomObjectDefinition,
    isLoading: isPending
  };
};

type Result = ActionResult<CustomObjectDefinitionErrorCode, { id: string }>;
