import { queryClient } from '@/app/app';
import { getShippingMethodError } from '@/lib/api/errors/shipping-method.errors';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_SHIPPING_METHOD_MUTATION } from '@/lib/api/operations/shipping-method.operations';
import type { MutationCreateShippingMethodArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useCreateShippingMethod = (zoneId: string) => {
  const { mutateAsync: createShippingMethod } = useGqlMutationDEPRECATED(
    CREATE_SHIPPING_METHOD_MUTATION,
    getShippingMethodError
  );

  const exec = async (input: Input): Promise<CreateShippingMethodResult> => {
    try {
      const { shippingMethod, error, errorCode } = await createShippingMethod(input);

      if (error) return { isSuccess: false, error, errorCode };

      await queryClient.refetchQueries({
        queryKey: [ShipmentCacheKeys.Zone(zoneId)]
      });

      return { isSuccess: true, data: { id: shippingMethod?.id as string } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to create shipping method' };
    }
  };

  return {
    createShippingMethod: exec
  };
};

type CreateShippingMethodResult = ActionResult<string, { id: string }>;

type Input = MutationCreateShippingMethodArgs;
