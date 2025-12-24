import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOM_OBJECT_DEFINITION_FRAGMENT,
  GET_CUSTOM_OBJECT_DEFINITIONS_QUERY
} from '@/lib/api/operations/custom-object-definition.operations';
import { type CustomObjectDefinitionListInput, getFragmentData } from '@/lib/api/types';

import { CustomObjectDefinitionCacheKeys } from '../constants/cache-keys';

export const useGetCustomObjectDefinitions = (input?: CustomObjectDefinitionListInput) => {
  const result = useGqlQuery(GET_CUSTOM_OBJECT_DEFINITIONS_QUERY, {
    key: [CustomObjectDefinitionCacheKeys.All],
    variables: { input }
  });

  const customObjectDefinitions =
    result.data?.customObjectDefinitions.items.map(d =>
      getFragmentData(COMMON_CUSTOM_OBJECT_DEFINITION_FRAGMENT, d)
    ) ?? [];
  const { count, pageInfo } = result.data?.customObjectDefinitions ?? {};

  return {
    customObjectDefinitions,
    pagination: { count, pageInfo },
    ...result
  };
};
