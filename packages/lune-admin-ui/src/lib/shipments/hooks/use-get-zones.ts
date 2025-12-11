import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LIST_ZONE_FRAGMENT,
  GET_ALL_ZONES_QUERY
} from '@/lib/api/operations/zone.operations';
import { getFragmentData } from '@/lib/api/types';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useGetZones = () => {
  const result = useGqlQuery(GET_ALL_ZONES_QUERY, {
    key: [ShipmentCacheKeys.All]
  });

  const zones = result.data?.zones?.map(z => getFragmentData(COMMON_LIST_ZONE_FRAGMENT, z)) ?? [];

  return {
    ...result,
    zones
  };
};
