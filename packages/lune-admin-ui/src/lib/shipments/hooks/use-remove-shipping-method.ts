import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { REMOVE_SHIPPING_METHOD_MUTATION } from '@/lib/api/operations/shipping-method.operations';
import type { MutationRemoveShippingMethodArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useRemoveShippingMethod = (zoneId: string) => {
  const { mutateAsync: removeShippingMethod } = useGqlMutation(REMOVE_SHIPPING_METHOD_MUTATION);

  const exec = async (input: Input): Promise<RemoveShippingMethodResult> => {
    try {
      const result = await removeShippingMethod(input);

      if (!result) return { isSuccess: false, error: 'Failed to remove shipping method' };

      await queryClient.refetchQueries({
        queryKey: [ShipmentCacheKeys.Zone(zoneId)]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to remove shipping method' };
    }
  };

  return {
    removeShippingMethod: exec
  };
};

type RemoveShippingMethodResult = ActionResult;

type Input = MutationRemoveShippingMethodArgs;
