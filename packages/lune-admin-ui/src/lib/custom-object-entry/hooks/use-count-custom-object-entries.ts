import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_CUSTOM_OBJECT_ENTRIES_COUNT_QUERY } from '@/lib/api/operations/custom-object-entry.operations';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useCountCustomObjectEntries = (definitionId: string) => {
  const { data, ...rest } = useGqlQuery(GET_CUSTOM_OBJECT_ENTRIES_COUNT_QUERY, {
    key: [CustomObjectEntryCacheKeys.Count(definitionId)],
    variables: { definitionId }
  });

  return {
    count: !!data?.customObjectEntries.count,
    ...rest
  };
};
