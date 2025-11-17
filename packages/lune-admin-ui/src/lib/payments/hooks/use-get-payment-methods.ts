import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_PAYMENT_METHOD_FRAGMENT,
  GET_ALL_PAYMENT_METHODS_QUERY
} from '@/lib/api/operations/payment-method.operations';
import { getFragmentData } from '@/lib/api/types';

import { PaymentCacheKeys } from '../constants/cache-keys';

export const useGetPaymentMethods = () => {
  const result = useGqlQuery(GET_ALL_PAYMENT_METHODS_QUERY, {
    key: [PaymentCacheKeys.PaymentMethods]
  });

  const paymentMethods =
    result.data?.paymentMethods?.map(pm => getFragmentData(COMMON_PAYMENT_METHOD_FRAGMENT, pm)) ??
    [];

  return {
    ...result,
    paymentMethods
  };
};
