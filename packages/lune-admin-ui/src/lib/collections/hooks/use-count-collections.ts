import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { GET_COLLECTIONS_EXISTS } from '@/lib/api/operations/collection.operations';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useCollectionsCount = () => {
  const { data, ...rest } = useGqlQuery(GET_COLLECTIONS_EXISTS, {
    key: [CollectionsCacheKeys.CollectionsExists]
  });

  return {
    count: !!data?.collections.count,
    ...rest
  };
};
