import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_COLLECTION_FOR_TRANSLATION_FRAGMENT,
  GET_COLLECTION_BY_ID_FOR_TRANSLATION_QUERY
} from '@/lib/api/operations/collection.operations';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useGetCollectionForTranslation = (id: string) => {
  const result = useGqlQuery(GET_COLLECTION_BY_ID_FOR_TRANSLATION_QUERY, {
    variables: { id },
    key: [CollectionsCacheKeys.CollectionForTranslation(id)]
  });

  const collection = getFragmentData(
    COMMON_COLLECTION_FOR_TRANSLATION_FRAGMENT,
    result.data?.collection
  );

  return {
    collection: collection ?? null,
    ...result
  };
};
