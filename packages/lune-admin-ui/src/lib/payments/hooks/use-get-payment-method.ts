import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_PAYMENT_METHOD_FRAGMENT,
  GET_PAYMENT_METHOD_QUERY
} from '@/lib/api/operations/payment-method.operations';
import { getFragmentData } from '@/lib/api/types';

import { PaymentCacheKeys } from '../constants/cache-keys';

export const useGetPaymentMethod = (id: string) => {
  const result = useGqlQuery(GET_PAYMENT_METHOD_QUERY, {
    variables: { id },
    key: [PaymentCacheKeys.PaymentMethod(id)]
  });

  const paymentMethod = getFragmentData(COMMON_PAYMENT_METHOD_FRAGMENT, result.data?.paymentMethod);

  return {
    ...result,
    paymentMethod
  };
};
