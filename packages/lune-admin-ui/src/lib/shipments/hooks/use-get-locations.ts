import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LIST_LOCATION_FRAGMENT,
  GET_ALL_LOCATIONS_QUERY
} from '@/lib/api/operations/location.operations';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useGetLocations = () => {
  const result = useGqlQuery(GET_ALL_LOCATIONS_QUERY, { key: [ShipmentCacheKeys.Locations] });

  const locations =
    result.data?.locations.items.map(l => getFragmentData(COMMON_LIST_LOCATION_FRAGMENT, l)) ?? [];

  return {
    ...result,
    locations
  };
};
