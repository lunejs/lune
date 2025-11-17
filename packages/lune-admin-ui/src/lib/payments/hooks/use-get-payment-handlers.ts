import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_PAYMENT_HANDLER_FRAGMENT,
  GET_ALL_PAYMENT_HANDLERS_QUERY
} from '@/lib/api/operations/payment-method.operations';

import { PaymentCacheKeys } from '../constants/cache-keys';

export const useGetPaymentHandlers = () => {
  const result = useGqlQuery(GET_ALL_PAYMENT_HANDLERS_QUERY, {
    key: [PaymentCacheKeys.PaymentHandlers]
  });

  const paymentHandlers =
    result.data?.paymentHandlers.map(p => getFragmentData(COMMON_PAYMENT_HANDLER_FRAGMENT, p)) ??
    [];

  return {
    ...result,
    paymentHandlers
  };
};
