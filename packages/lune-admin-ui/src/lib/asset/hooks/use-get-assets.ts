import { useMemo } from 'react';

import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import { COMMON_ASSET_FRAGMENT, GET_ALL_ASSETS_QUERY } from '@/lib/api/operations/asset.operations';
import { type AssetListInput, getFragmentData } from '@/lib/api/types';

import { AssetCacheKeys } from '../constants/cache-keys';

export const useGetAssets = (input?: AssetListInput) => {
  const result = useGqlQuery(GET_ALL_ASSETS_QUERY, {
    variables: { input },
    key: [AssetCacheKeys.All]
  });

  const assets = useMemo(
    () =>
      result.data?.assets.items.map(asset => getFragmentData(COMMON_ASSET_FRAGMENT, asset)) ?? [],
    [result.data]
  );
  const { count, pageInfo } = result.data?.assets ?? {};

  return {
    ...result,
    assets,
    pagination: { count, pageInfo }
  };
};
