import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOM_OBJECT_ENTRY_FRAGMENT,
  GET_CUSTOM_OBJECT_ENTRY_QUERY
} from '@/lib/api/operations/custom-object-entry.operations';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useGetCustomObjectEntry = (id: string) => {
  const result = useGqlQuery(GET_CUSTOM_OBJECT_ENTRY_QUERY, {
    key: [CustomObjectEntryCacheKeys.Unique(id)],
    variables: { id }
  });

  const customObjectEntry = getFragmentData(
    COMMON_CUSTOM_OBJECT_ENTRY_FRAGMENT,
    result.data?.customObjectEntry
  );

  return {
    customObjectEntry: customObjectEntry ?? null,
    ...result
  };
};
