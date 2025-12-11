import { queryClient } from '@/app/app';
import { getLocationError } from '@/lib/api/errors/location.errors';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_IN_STORE_PICKUP_PREFERENCE_MUTATION } from '@/lib/api/operations/location.operations';
import type { MutationUpdateInStorePickupPreferencesArgs } from '@/lib/api/types';
import { LocationCacheKeys } from '@/lib/locations/constants/cache-keys';
import type { ActionResult } from '@/shared/utils/result.utils';

export const useUpdateInStorePickupPreferences = () => {
  const { mutateAsync: updateInStorePickupPreferences } = useGqlMutationDEPRECATED(
    UPDATE_IN_STORE_PICKUP_PREFERENCE_MUTATION,
    getLocationError
  );

  const exec = async (input: Input): Promise<UpdateInStorePickupPreferencesResult> => {
    try {
      await updateInStorePickupPreferences(input);

      await Promise.all([
        await queryClient.refetchQueries({
          queryKey: [LocationCacheKeys.All]
        }),
        await queryClient.refetchQueries({
          queryKey: [LocationCacheKeys.Unique(input.locationId)]
        })
      ]);

      return { isSuccess: true, data: { id: input.locationId } };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error: 'Failed to update in-store pickup preferences'
      };
    }
  };

  return {
    updateInStorePickupPreferences: exec
  };
};

type UpdateInStorePickupPreferencesResult = ActionResult<string, { id: string }>;

type Input = MutationUpdateInStorePickupPreferencesArgs;
