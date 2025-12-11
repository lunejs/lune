import { useEffect, useMemo } from 'react';

import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useAssetsCount } from '../../hooks/use-assets-count';
import { useGetAssets } from '../../hooks/use-get-assets';

import type { AssetsTableRow } from './assets-table';

export const useAssetsTable = () => {
  const dataTable = useDataTable<AssetTableFilters>({
    search: ''
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useAssetsCount();

  const {
    isLoading,
    isRefetching,
    assets: allAssets,
    pagination: { pageInfo },
    refetch
  } = useGetAssets({
    filters: {
      ...(filters.search && { filename: { contains: filters.search } })
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination]);

  const assets: AssetsTableRow[] = useMemo(
    () => allAssets?.map(a => ({ ...a, createdAt: new Date(a.createdAt) })) ?? [],
    [allAssets]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  return {
    dataTable,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    assets,
    totalRows: pageInfo?.total ?? 0
  };
};

type AssetTableFilters = {
  search: string;
};
