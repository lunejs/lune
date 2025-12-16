import { useQueryClient } from '@tanstack/react-query';

import { LuneLogger } from '@lune/common';

import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getOrderError } from '@/lib/api/errors/order.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { MARK_ORDER_AS_SHIPPED_MUTATION } from '@/lib/api/operations/order.operations';
import type { MarkOrderAsShippedInput, OrderErrorCode } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { OrderCacheKeys } from '../constants/cache-keys';

export const useMarkOrderAsShipped = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useGqlMutation(MARK_ORDER_AS_SHIPPED_MUTATION);

  const markAsShipped = async (
    orderId: string,
    input: MarkOrderAsShippedInput
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
    markAsShipped,
    isLoading: isPending
  };
};
