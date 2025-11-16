import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_SHIPPING_METHOD_MUTATION } from '@/lib/api/operations/shipping-method.operations';
import type { MutationUpdateShippingMethodArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useUpdateShippingMethod = (zoneId: string) => {
  const { mutateAsync: updateShippingMethod } = useGqlMutation(UPDATE_SHIPPING_METHOD_MUTATION);

  const exec = async (input: Input): Promise<UpdateShippingMethodResult> => {
    try {
      const result = await updateShippingMethod(input);

      await queryClient.refetchQueries({
        queryKey: [ShipmentCacheKeys.Zone(zoneId)]
      });

      return { isSuccess: true, data: { id: result.id } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to update shipping method' };
    }
  };

  return {
    updateShippingMethod: exec
  };
};

type UpdateShippingMethodResult = ActionResult<string, { id: string }>;

type Input = MutationUpdateShippingMethodArgs;
