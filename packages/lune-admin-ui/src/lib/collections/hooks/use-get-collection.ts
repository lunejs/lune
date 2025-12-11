import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_COLLECTION_FRAGMENT,
  GET_COLLECTION_BY_ID_QUERY
} from '@/lib/api/operations/collection.operations';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useGetCollection = (id: string) => {
  const result = useGqlQuery(GET_COLLECTION_BY_ID_QUERY, {
    variables: { id },
    key: [CollectionsCacheKeys.Unique(id)]
  });

  const collection = getFragmentData(COMMON_COLLECTION_FRAGMENT, result.data?.collection);

  return {
    ...result,
    collection: collection ?? null
  };
};
