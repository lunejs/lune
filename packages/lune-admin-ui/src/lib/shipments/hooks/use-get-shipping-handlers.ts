import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_SHIPPING_HANDLERS_FRAGMENT,
  GET_ALL_SHIPPING_HANDLERS_QUERY
} from '@/lib/api/operations/shipping-method.operations';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useGetShippingHandlers = () => {
  const result = useGqlQuery(GET_ALL_SHIPPING_HANDLERS_QUERY, {
    key: [ShipmentCacheKeys.Handlers]
  });

  const shippingHandlers =
    result.data?.shippingHandlers.map(s => getFragmentData(COMMON_SHIPPING_HANDLERS_FRAGMENT, s)) ??
    [];

  return {
    ...result,
    shippingHandlers
  };
};
