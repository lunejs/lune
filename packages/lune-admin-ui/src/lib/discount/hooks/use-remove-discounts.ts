import { LuneLogger } from '@lune/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { REMOVE_DISCOUNT_MUTATION } from '@/lib/api/operations/discount.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { DiscountCacheKeys } from '../constants/cache-keys';

export const useRemoveDiscounts = () => {
  const { isPending, mutateAsync } = useGqlMutation(REMOVE_DISCOUNT_MUTATION);

  const removeDiscounts = async (ids: string[]): Promise<ActionResult> => {
    try {
      const result = await mutateAsync({ ids });

      if (!result) return { isSuccess: false, error: 'Failed to remove discounts' };

      await queryClient.refetchQueries({
        queryKey: [DiscountCacheKeys.All]
      });

      return { isSuccess: true };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    removeDiscounts,
    isLoading: isPending
  };
};
