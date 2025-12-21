import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOM_FIELD_DEFINITION_FRAGMENT,
  GET_CUSTOM_FIELD_DEFINITION_QUERY
} from '@/lib/api/operations/custom-field-definition.operations';

import { CustomFieldDefinitionsCacheKeys } from '../constants/cache-keys';

export const useGetCustomFieldDefinition = (id: string) => {
  const result = useGqlQuery(GET_CUSTOM_FIELD_DEFINITION_QUERY, {
    variables: { id },
    key: [CustomFieldDefinitionsCacheKeys.Unique(id)]
  });

  const customFieldDefinition = getFragmentData(
    COMMON_CUSTOM_FIELD_DEFINITION_FRAGMENT,
    result.data?.customFieldDefinition
  );

  return {
    ...result,
    customFieldDefinition: customFieldDefinition ?? null
  };
};
