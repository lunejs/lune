import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation-v2';
import { REMOVE_ASSETS_MUTATION } from '@/lib/api/operations/asset.operations';
import type { ActionResult } from '@/shared/utils/result.utils';

import { AssetCacheKeys } from '../constants/cache-keys';

export const useRemoveAssets = () => {
  const { mutateAsync } = useGqlMutation(REMOVE_ASSETS_MUTATION);

  const removeAssets = async (ids: string[]): Promise<ActionResult> => {
    try {
      const isSuccess = await mutateAsync({ ids });

      if (!isSuccess) {
        return { isSuccess: false, error: 'Failed to remove assets' };
      }

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [AssetCacheKeys.All] }),
        queryClient.refetchQueries({ queryKey: [AssetCacheKeys.Count] })
      ]);

      return { isSuccess: true };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, error: 'Failed to remove assets' };
    }
  };

  return {
    removeAssets
  };
};
