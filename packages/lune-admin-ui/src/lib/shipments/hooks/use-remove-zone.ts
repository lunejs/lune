import { queryClient } from '@/app/app';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { REMOVE_ZONE_MUTATION } from '@/lib/api/operations/zone.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { ShipmentCacheKeys } from '../constants/cache-keys';

export const useRemoveZone = () => {
  const { mutateAsync: removeZone } = useGqlMutationDEPRECATED(REMOVE_ZONE_MUTATION);

  const exec = async (id: string): Promise<RemoveZoneResult> => {
    try {
      await removeZone({ id });

      await queryClient.refetchQueries({
        queryKey: [ShipmentCacheKeys.All]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to remove zone' };
    }
  };

  return {
    removeZone: exec
  };
};

type RemoveZoneResult = ActionResult;
