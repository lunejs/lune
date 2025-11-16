import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COMMON_ZONE_FRAGMENT, GET_ZONE_QUERY } from '@/lib/api/operations/zone.operations';
import { getFragmentData } from '@/lib/api/types';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useGetZone = (id: string) => {
  const result = useGqlQuery(GET_ZONE_QUERY, {
    variables: {
      id
    },
    key: [ShipmentCacheKeys.Zone(id)]
  });

  return {
    ...result,
    zone: getFragmentData(COMMON_ZONE_FRAGMENT, result.data?.zone)
  };
};
