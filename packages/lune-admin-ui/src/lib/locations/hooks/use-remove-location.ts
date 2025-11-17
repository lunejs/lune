import { queryClient } from '@/app/app';
import { getLocationError } from '@/lib/api/errors/location.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { REMOVE_LOCATION_MUTATION } from '@/lib/api/operations/location.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { LocationCacheKeys } from '../constants/cache-keys';

export const useRemoveLocation = () => {
  const { mutateAsync: removeLocation } = useGqlMutation(
    REMOVE_LOCATION_MUTATION,
    getLocationError
  );

  const exec = async (id: string): Promise<RemoveLocationResult> => {
    try {
      await removeLocation({ id });

      await queryClient.refetchQueries({
        queryKey: [LocationCacheKeys.Locations]
      });

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to remove location' };
    }
  };

  return {
    removeLocation: exec
  };
};

type RemoveLocationResult = ActionResult;
