import { queryClient } from '@/app/app';
import { getLocationError } from '@/lib/api/errors/location.errors';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_LOCATION_MUTATION } from '@/lib/api/operations/location.operations';
import type { CreateLocationInput } from '@/lib/api/types';
import type { ActionResult } from '@/shared/utils/result.utils';

import { LocationCacheKeys } from '../constants/cache-keys';

export const useCreateLocation = () => {
  const { mutateAsync: createLocation } = useGqlMutation(
    CREATE_LOCATION_MUTATION,
    getLocationError
  );

  const exec = async (input: Input): Promise<CreateLocationResult> => {
    try {
      const { location, error, errorCode } = await createLocation({ input });

      if (error) return { isSuccess: false, error, errorCode };

      await Promise.all([
        await queryClient.refetchQueries({
          queryKey: [LocationCacheKeys.Locations]
        }),
        await queryClient.refetchQueries({
          queryKey: [LocationCacheKeys.Location(location?.id as string)]
        })
      ]);

      return { isSuccess: true, data: { id: location?.id as string } };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to create location' };
    }
  };

  return {
    createLocation: exec
  };
};

type CreateLocationResult = ActionResult<string, { id: string }>;

type Input = CreateLocationInput;
