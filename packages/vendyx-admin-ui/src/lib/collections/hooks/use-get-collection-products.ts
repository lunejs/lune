import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_COLLECTION_PRODUCT_FRAGMENT,
  GET_ALL_COLLECTION_PRODUCTS_QUERY
} from '@/lib/api/operations/collection.operations';
import { getFragmentData, type ProductListInput } from '@/lib/api/types';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useGetCollectionProducts = (collectionId: string, input?: ProductListInput) => {
  console.log({ input });
  const result = useGqlQuery(GET_ALL_COLLECTION_PRODUCTS_QUERY, {
    variables: { id: collectionId, input },
    key: [CollectionsCacheKeys.Products(collectionId)]
  });

  const products = result.data?.collection?.products.items.map(item =>
    getFragmentData(COMMON_COLLECTION_PRODUCT_FRAGMENT, item)
  );

  return {
    ...result,
    products
  };
};
