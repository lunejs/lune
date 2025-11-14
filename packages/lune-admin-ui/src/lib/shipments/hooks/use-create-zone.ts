import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_ZONE_MUTATION } from '@/lib/api/operations/zone.operations';
import type { CreateZoneInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useCreateZone = () => {
  const { mutateAsync: createZone } = useGqlMutation(CREATE_ZONE_MUTATION);

  const exec = async (input: Input): Promise<CreateZoneResult> => {
    try {
      const result = await createZone({ input });

      await Promise.all([
        await queryClient.refetchQueries({
          queryKey: [ShipmentCacheKeys.Zones]
        }),
        await queryClient.refetchQueries({
          queryKey: [ShipmentCacheKeys.Zone(result.id)]
        })
      ]);

      return { isSuccess: true, data: { id: result.id } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to create zone' };
    }
  };

  return {
    createZone: exec
  };
};

type CreateZoneResult = ActionResult<string, { id: string }>;

type Input = CreateZoneInput;
