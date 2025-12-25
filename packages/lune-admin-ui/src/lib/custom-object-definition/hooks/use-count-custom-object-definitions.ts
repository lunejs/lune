import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_CUSTOM_OBJECT_DEFINITIONS_EXISTS } from '@/lib/api/operations/custom-object-definition.operations';

import { CustomObjectDefinitionCacheKeys } from '../constants/cache-keys';

export const useCustomObjectDefinitionsCount = () => {
  const { data, ...rest } = useGqlQuery(GET_CUSTOM_OBJECT_DEFINITIONS_EXISTS, {
    key: [CustomObjectDefinitionCacheKeys.Count]
  });

  return {
    count: !!data?.customObjectDefinitions.count,
    ...rest
  };
};
