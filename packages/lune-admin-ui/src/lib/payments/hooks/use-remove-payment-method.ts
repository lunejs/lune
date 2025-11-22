import { queryClient } from '@/app/app';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { REMOVE_PAYMENT_METHOD_MUTATION } from '@/lib/api/operations/payment-method.operations';
import type { MutationRemovePaymentMethodArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { PaymentCacheKeys } from '../constants/cache-keys';

export const useRemovePaymentMethod = () => {
  const { mutateAsync: removePaymentMethod } = useGqlMutationDEPRECATED(
    REMOVE_PAYMENT_METHOD_MUTATION
  );

  const exec = async (input: Input): Promise<RemovePaymentMethodResult> => {
    try {
      const result = await removePaymentMethod(input);

      if (!result) return { isSuccess: false, error: 'Failed to remove payment method' };

      await queryClient.refetchQueries({
        queryKey: [PaymentCacheKeys.PaymentMethods]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to remove payment method' };
    }
  };

  return {
    removePaymentMethod: exec
  };
};

type RemovePaymentMethodResult = ActionResult;

type Input = MutationRemovePaymentMethodArgs;
