import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_COLLECTION_SUB_COLLECTION_FRAGMENT,
  GET_ALL_COLLECTION_SUB_COLLECTION_QUERY
} from '@/lib/api/operations/collection.operations';
import { type CollectionListInput, getFragmentData } from '@/lib/api/types';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useGetCollectionSubCollections = (
  collectionId: string,
  input?: CollectionListInput
) => {
  const result = useGqlQuery(GET_ALL_COLLECTION_SUB_COLLECTION_QUERY, {
    variables: { id: collectionId, input },
    key: [CollectionsCacheKeys.SubCollections(collectionId)]
  });

  const subCollections =
    result.data?.collection?.subCollections.items.map(item =>
      getFragmentData(COMMON_COLLECTION_SUB_COLLECTION_FRAGMENT, item)
    ) ?? [];

  return {
    ...result,
    subCollections
  };
};
