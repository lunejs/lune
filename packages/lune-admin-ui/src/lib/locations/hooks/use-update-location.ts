import { queryClient } from '@/app/app';
import { getLocationError } from '@/lib/api/errors/location.errors';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_LOCATION_MUTATION } from '@/lib/api/operations/location.operations';
import type { MutationUpdateLocationArgs } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { LocationCacheKeys } from '../constants/cache-keys';

export const useUpdateLocation = () => {
  const { mutateAsync: updateLocation } = useGqlMutationDEPRECATED(
    UPDATE_LOCATION_MUTATION,
    getLocationError
  );

  const exec = async (input: Input): Promise<UpdateLocationResult> => {
    try {
      const { location, error, errorCode } = await updateLocation(input);

      if (error) return { isSuccess: false, error, errorCode };

      await Promise.all([
        await queryClient.refetchQueries({
          queryKey: [LocationCacheKeys.All]
        }),
        await queryClient.refetchQueries({
          queryKey: [LocationCacheKeys.Unique(location?.id as string)]
        })
      ]);

      return { isSuccess: true, data: { id: location?.id as string } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to update location' };
    }
  };

  return {
    updateLocation: exec
  };
};

type UpdateLocationResult = ActionResult<string, { id: string }>;

type Input = MutationUpdateLocationArgs;
