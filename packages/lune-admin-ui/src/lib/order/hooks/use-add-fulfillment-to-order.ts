import { useQueryClient } from '@tanstack/react-query';

import { LuneLogger } from '@lunejs/common';

import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getOrderError } from '@/lib/api/errors/order.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { ADD_FULFILLMENT_TO_ORDER_MUTATION } from '@/lib/api/operations/order.operations';
import type { AddFulfillmentToOrderInput, OrderErrorCode } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useAddFulfillmentToOrder = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useGqlMutation(ADD_FULFILLMENT_TO_ORDER_MUTATION);

  const addFulfillmentToOrder = async (
    orderId: string,
    input: AddFulfillmentToOrderInput
  ): Promise<ActionResult<OrderErrorCode>> => {
    try {
      const { apiErrors } = await mutateAsync({ id: orderId, input });

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
    addFulfillmentToOrder,
    isLoading: isPending
  };
};
