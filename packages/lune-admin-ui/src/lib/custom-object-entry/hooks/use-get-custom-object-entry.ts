import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_CUSTOM_OBJECT_ENTRY_QUERY } from '@/lib/api/operations/custom-object-entry.operations';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useGetCustomObjectEntry = (id: string) => {
  const result = useGqlQuery(GET_CUSTOM_OBJECT_ENTRY_QUERY, {
    key: [CustomObjectEntryCacheKeys.Unique(id)],
    variables: { id }
  });

  return {
    customObjectEntry: result.data?.customObjectEntry ?? null,
    ...result
  };
};
