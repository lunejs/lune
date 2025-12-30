import { LuneLogger } from '@lunejs/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getCustomFieldDefinitionError } from '@/lib/api/errors/custom-field-definition.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { CREATE_CUSTOM_FIELD_DEFINITION_MUTATION } from '@/lib/api/operations/custom-field-definition.operations';
import type { CreateCustomFieldInput, CustomFieldDefinitionErrorCode } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CustomFieldDefinitionsCacheKeys } from '../constants/cache-keys';

export const useCreateCustomFieldDefinition = () => {
  const { isPending, mutateAsync } = useGqlMutation(CREATE_CUSTOM_FIELD_DEFINITION_MUTATION);

  const createCustomFieldDefinition = async (input: CreateCustomFieldInput): Promise<Result> => {
    try {
      const { apiErrors, customFieldDefinition } = await mutateAsync({ input });

      if (apiErrors.length) {
        const { error, errorCode } = getCustomFieldDefinitionError(apiErrors);

        return { isSuccess: false, error, errorCode };
      }

      await queryClient.refetchQueries({
        queryKey: [CustomFieldDefinitionsCacheKeys.All]
      });

      return { isSuccess: true, data: { id: customFieldDefinition?.id as string } };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    createCustomFieldDefinition,
    isLoading: isPending
  };
};

type Result = ActionResult<CustomFieldDefinitionErrorCode, { id: string }>;
