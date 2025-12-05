import { LuneLogger } from '@lune/common';

import { queryClient } from '@/app/app';
import { GENERIC_ERROR } from '@/lib/api/errors/common.errors';
import { getDiscountError } from '@/lib/api/errors/discount.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { UPDATE_DISCOUNT_MUTATION } from '@/lib/api/operations/discount.operations';
import type { DiscountErrorCode, UpdateDiscountInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { DiscountCacheKeys } from '../constants/cache-keys';

export const useUpdateDiscount = () => {
  const { isPending, mutateAsync } = useGqlMutation(UPDATE_DISCOUNT_MUTATION);

  const updateDiscount = async (id: string, input: UpdateDiscountInput): Promise<Result> => {
    try {
      const { apiErrors, discount } = await mutateAsync({ id, input });

      if (apiErrors.length) {
        const { error, errorCode } = getDiscountError(apiErrors);

        return { isSuccess: false, error, errorCode };
      }

      await queryClient.refetchQueries({
        queryKey: [DiscountCacheKeys.all]
      });

      return { isSuccess: true, data: { id: discount?.id as string } };
    } catch (error) {
      LuneLogger.error(error);
      return { isSuccess: false, error: GENERIC_ERROR };
    }
  };

  return {
    updateDiscount,
    isLoading: isPending
  };
};

type Result = ActionResult<DiscountErrorCode, { id: string }>;
