import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOMER_FRAGMENT,
  GET_CUSTOMER_BY_ID_QUERY
} from '@/lib/api/operations/customer.operations';

import { CustomerCacheKeys } from '../constants/cache-keys';

export const useGetCustomer = (id: string) => {
  const result = useGqlQuery(GET_CUSTOMER_BY_ID_QUERY, {
    variables: { id },
    key: [CustomerCacheKeys.Unique(id)]
  });

  const customer = getFragmentData(COMMON_CUSTOMER_FRAGMENT, result.data?.customer);

  return {
    customer,
    ...result
  };
};
