import { queryClient } from '@/app/app';
import { getPaymentMethodError } from '@/lib/api/errors/payment-method.errors';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_PAYMENT_METHOD_MUTATION } from '@/lib/api/operations/payment-method.operations';
import type { MutationCreatePaymentMethodArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { PaymentCacheKeys } from '../constants/cache-keys';

export const useCreatePaymentMethod = () => {
  const { mutateAsync: createPaymentMethod } = useGqlMutationDEPRECATED(
    CREATE_PAYMENT_METHOD_MUTATION,
    getPaymentMethodError
  );

  const exec = async (input: Input): Promise<CreatePaymentMethodResult> => {
    try {
      const { paymentMethod, error, errorCode } = await createPaymentMethod(input);

      if (error) return { isSuccess: false, error, errorCode };

      await queryClient.refetchQueries({
        queryKey: [PaymentCacheKeys.All]
      });

      return { isSuccess: true, data: { id: paymentMethod?.id as string } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to create payment method' };
    }
  };

  return {
    createPaymentMethod: exec
  };
};

type CreatePaymentMethodResult = ActionResult<string, { id: string }>;

type Input = MutationCreatePaymentMethodArgs;
