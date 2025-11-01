import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LIST_COLLECTION_FRAGMENT,
  GET_ALL_COLLECTIONS_QUERY
} from '@/lib/api/operations/collection.operations';
import { type CollectionListInput, getFragmentData } from '@/lib/api/types';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useGetCollections = (input?: CollectionListInput) => {
  const { data, ...rest } = useGqlQuery(GET_ALL_COLLECTIONS_QUERY, {
    variables: { input },
    key: [CollectionsCacheKeys.Collections, JSON.stringify(input?.filters)]
  });

  const collections =
    data?.collections?.items.map(p => getFragmentData(COMMON_LIST_COLLECTION_FRAGMENT, p)) ?? [];
  const pagination = { count: data?.collections?.count, pageInfo: data?.collections?.pageInfo };

  return {
    collections,
    pagination,
    ...rest
  };
};
