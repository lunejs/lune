import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LOCATION_FRAGMENT,
  GET_LOCATION_BY_ID_QUERY
} from '@/lib/api/operations/location.operations';

import { LocationCacheKeys } from '../constants/cache-keys';

export const useGetLocation = (id: string) => {
  const result = useGqlQuery(GET_LOCATION_BY_ID_QUERY, {
    variables: { id },
    key: [LocationCacheKeys.Locations]
  });

  const location = getFragmentData(COMMON_LOCATION_FRAGMENT, result.data?.location);

  return {
    ...result,
    location: location ?? null
  };
};
