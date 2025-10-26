import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_COLLECTIONS_EXISTS } from '@/lib/api/operations/collection.operations';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useGetCollectionsExists = () => {
  const { data, ...rest } = useGqlQuery(GET_COLLECTIONS_EXISTS, {
    key: [CollectionsCacheKeys.CollectionsExists]
  });

  return {
    hasCollections: !!data?.collections.count,
    ...rest
  };
};
