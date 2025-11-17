import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_PAYMENT_METHOD_MUTATION } from '@/lib/api/operations/payment-method.operations';
import type { MutationUpdatePaymentMethodArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { PaymentCacheKeys } from '../constants/cache-keys';

export const useUpdatePaymentMethod = () => {
  const { mutateAsync: updatePaymentMethod } = useGqlMutation(UPDATE_PAYMENT_METHOD_MUTATION);

  const exec = async (input: Input): Promise<UpdatePaymentMethodResult> => {
    try {
      const result = await updatePaymentMethod(input);

      await Promise.all([
        await queryClient.refetchQueries({
          queryKey: [PaymentCacheKeys.PaymentMethods]
        }),
        await queryClient.refetchQueries({
          queryKey: [PaymentCacheKeys.PaymentMethod(input.id)]
        })
      ]);

      return { isSuccess: true, data: { id: result.id } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to update payment method' };
    }
  };

  return {
    updatePaymentMethod: exec
  };
};

type UpdatePaymentMethodResult = ActionResult<string, { id: string }>;

type Input = MutationUpdatePaymentMethodArgs;
