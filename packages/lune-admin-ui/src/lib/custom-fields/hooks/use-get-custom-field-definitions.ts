import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOM_FIELD_DEFINITION_FRAGMENT,
  GET_CUSTOM_FIELD_DEFINITIONS_QUERY
} from '@/lib/api/operations/custom-field-definition.operations';
import type { CustomFieldDefinitionListInput } from '@/lib/api/types';

import { CustomFieldDefinitionsCacheKeys } from '../constants/cache-keys';

export const useGetCustomFieldDefinitions = (input?: CustomFieldDefinitionListInput) => {
  const { data, ...rest } = useGqlQuery(GET_CUSTOM_FIELD_DEFINITIONS_QUERY, {
    variables: { input },
    key: [CustomFieldDefinitionsCacheKeys.All]
  });

  const customFieldDefinitions =
    data?.customFieldDefinitions?.items.map(item =>
      getFragmentData(COMMON_CUSTOM_FIELD_DEFINITION_FRAGMENT, item)
    ) ?? [];
  const pagination = {
    count: data?.customFieldDefinitions?.count,
    pageInfo: data?.customFieldDefinitions?.pageInfo
  };

  return {
    customFieldDefinitions,
    pagination,
    ...rest
  };
};
