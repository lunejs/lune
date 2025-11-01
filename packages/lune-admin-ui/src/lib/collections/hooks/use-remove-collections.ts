import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { REMOVE_COLLECTIONS_MUTATION } from '@/lib/api/operations/collection.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { CollectionsCacheKeys } from '../constants/cache-keys';

export const useRemoveCollections = () => {
  const { mutateAsync } = useGqlMutation(REMOVE_COLLECTIONS_MUTATION);

  const removeCollections = async (ids: string[]): Promise<ActionResult> => {
    try {
      const isSuccess = await mutateAsync({ ids });

      if (!isSuccess) {
        return { isSuccess: false, error: 'Failed to remove collections' };
      }

      await Promise.all([
        queryClient.refetchQueries({
          queryKey: [CollectionsCacheKeys.Collections]
        }),
        queryClient.refetchQueries({
          queryKey: [CollectionsCacheKeys.CollectionsExists]
        })
      ]);

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to remove collections' };
    }
  };

  return {
    removeCollections
  };
};
