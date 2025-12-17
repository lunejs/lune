import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_LIST_CUSTOMER_FRAGMENT,
  GET_ALL_CUSTOMERS_QUERY
} from '@/lib/api/operations/customer.operations';
import { type CustomerListInput, getFragmentData } from '@/lib/api/types';

import { CustomerCacheKeys } from '../constants/cache-keys';

export const useGetCustomers = (input?: CustomerListInput) => {
  const result = useGqlQuery(GET_ALL_CUSTOMERS_QUERY, {
    key: [CustomerCacheKeys.All],
    variables: { input }
  });

  const customers =
    result.data?.customers.items.map(c => getFragmentData(COMMON_LIST_CUSTOMER_FRAGMENT, c)) ?? [];
  const { count, pageInfo } = result.data?.customers ?? {};

  return {
    customers,
    pagination: { count, pageInfo },
    ...result
  };
};
