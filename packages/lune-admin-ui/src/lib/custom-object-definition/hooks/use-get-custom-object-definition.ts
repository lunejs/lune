import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOM_OBJECT_DEFINITION_FRAGMENT,
  GET_CUSTOM_OBJECT_DEFINITION_QUERY
} from '@/lib/api/operations/custom-object-definition.operations';
import { getFragmentData } from '@/lib/api/types';

import { CustomObjectDefinitionCacheKeys } from '../constants/cache-keys';

export const useGetCustomObjectDefinition = (id: string) => {
  const result = useGqlQuery(GET_CUSTOM_OBJECT_DEFINITION_QUERY, {
    key: [CustomObjectDefinitionCacheKeys.Unique(id)],
    variables: { id }
  });

  const customObjectDefinition = getFragmentData(
    COMMON_CUSTOM_OBJECT_DEFINITION_FRAGMENT,
    result.data?.customObjectDefinition
  );

  return {
    customObjectDefinition,
    ...result
  };
};
