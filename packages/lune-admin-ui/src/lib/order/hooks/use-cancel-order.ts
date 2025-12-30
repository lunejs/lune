import { LuneLogger } from '@lunejs/common';
import { useQueryClient } from '@tanstack/react-query';

import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getOrderError } from '@/lib/api/errors/order.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { CANCEL_ORDER_MUTATION } from '@/lib/api/operations/order.operations';
import type { CancelOrderInput, OrderErrorCode } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useGqlMutation(CANCEL_ORDER_MUTATION);

  const cancelOrder = async (
    orderId: string,
    input: CancelOrderInput
  ): Promise<ActionResult<OrderErrorCode>> => {
    try {
      const { apiErrors } = await mutateAsync({ orderId, input });

      if (apiErrors.length) {
        const { error, errorCode } = getOrderError(apiErrors);

        return { isSuccess: false, error, errorCode };
      }

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [OrderCacheKeys.All] }),
        queryClient.refetchQueries({ queryKey: [OrderCacheKeys.Unique(orderId)] })
      ]);

      return { isSuccess: true };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    cancelOrder,
    isLoading: isPending
  };
};
