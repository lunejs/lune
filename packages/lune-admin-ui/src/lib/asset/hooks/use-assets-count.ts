import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COUNT_ASSETS_QUERY } from '@/lib/api/operations/asset.operations';

import { AssetCacheKeys } from '../constants/cache-keys';

export const useAssetsCount = () => {
  const { data, ...rest } = useGqlQuery(COUNT_ASSETS_QUERY, {
    key: [AssetCacheKeys.Count]
  });

  return {
    count: data?.assets.count,
    ...rest
  };
};
