import { useMemo } from 'react';

import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_CUSTOM_OBJECT_ENTRIES_QUERY } from '@/lib/api/operations/custom-object-entry.operations';
import type { ListInput } from '@/lib/api/types';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useGetCustomObjectEntries = (definitionId: string, input: ListInput) => {
  const result = useGqlQuery(GET_CUSTOM_OBJECT_ENTRIES_QUERY, {
    key: [CustomObjectEntryCacheKeys.All, definitionId],
    variables: { definitionId, input }
  });

  const customObjectEntries = useMemo(
    () => result.data?.customObjectEntries.items ?? [],
    [result.data]
  );

  const { count, pageInfo } = result.data?.customObjectEntries ?? {};

  return {
    customObjectEntries,
    pagination: { count, pageInfo },
    ...result
  };
};
