import { LuneLogger } from '@lunejs/common';
import { useQueryClient } from '@tanstack/react-query';

import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getOrderError } from '@/lib/api/errors/order.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { MARK_FULFILLMENT_AS_PICKED_UP_MUTATION } from '@/lib/api/operations/order.operations';
import type { OrderErrorCode } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useMarkFulfillmentAsPickedUp = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useGqlMutation(MARK_FULFILLMENT_AS_PICKED_UP_MUTATION);

  const markAsPickedUp = async (
    orderId: string,
    fulfillmentId: string
  ): Promise<ActionResult<OrderErrorCode>> => {
    try {
      const { apiErrors } = await mutateAsync({ fulfillmentId });

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
    markAsPickedUp,
    isLoading: isPending
  };
};
