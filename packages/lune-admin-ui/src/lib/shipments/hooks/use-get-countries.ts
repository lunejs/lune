import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_COUNTRY_FRAGMENT,
  GET_ALL_COUNTRIES_QUERY
} from '@/lib/api/operations/country.operations';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useGetCountries = () => {
  const result = useGqlQuery(GET_ALL_COUNTRIES_QUERY, {
    key: [ShipmentCacheKeys.Countries]
  });

  const countries =
    result.data?.countries.map(c => getFragmentData(COMMON_COUNTRY_FRAGMENT, c)) ?? [];

  return {
    ...result,
    countries
  };
};
