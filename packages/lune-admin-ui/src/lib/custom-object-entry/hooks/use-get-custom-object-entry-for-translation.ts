import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOM_OBJECT_ENTRY_FOR_TRANSLATION_FRAGMENT,
  GET_CUSTOM_OBJECT_ENTRY_FOR_TRANSLATION_QUERY
} from '@/lib/api/operations/custom-object-entry.operations';

import { CustomObjectEntryCacheKeys } from '../constants/cache-keys';

export const useGetCustomObjectEntryForTranslation = (id: string) => {
  const { data, isLoading, isRefetching, refetch } = useGqlQuery(
    GET_CUSTOM_OBJECT_ENTRY_FOR_TRANSLATION_QUERY,
    {
      variables: { id },
      key: [CustomObjectEntryCacheKeys.UniqueForTranslation(id)]
    }
  );

  const customObjectEntry = getFragmentData(
    COMMON_CUSTOM_OBJECT_ENTRY_FOR_TRANSLATION_FRAGMENT,
    data?.customObjectEntry
  );

  return {
    customObjectEntry: customObjectEntry ?? null,
    isLoading,
    isRefetching,
    refetch
  };
};
