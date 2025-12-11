import { useEffect, useMemo } from 'react';

import { CollectionContentType } from '@/lib/api/types';
import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useCollectionsCount } from '../../hooks/use-count-collections';
import { useGetCollections } from '../../hooks/use-get-collections';

import type { CollectionsTableRow, CollectionTableFilters } from './collections-table';

export const useCollectionsTable = () => {
  const dataTable = useDataTable<CollectionTableFilters>({
    search: ''
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCollectionCount, count } = useCollectionsCount();

  const {
    isLoading,
    isRefetching,
    collections: allCollections,
    pagination: { pageInfo },
    refetch
  } = useGetCollections({
    filters: {
      ...(filters.search && { name: { contains: filters.search } }),
      isTopLevel: { equals: true }
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination]);

  const collections: CollectionsTableRow[] = useMemo(
    () =>
      allCollections?.map(c => ({
        id: c.id,
        image: c.assets.items[0]?.source,
        name: c.name,
        status: c.enabled,
        totalContent:
          c.contentType === CollectionContentType.Products
            ? c.products.count
            : c.subCollections.count,
        contentType: c.contentType
      })) ?? [],
    [allCollections]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCollectionCount && !count;
  }, [isLoading, isLoadingCollectionCount, count]);

  return {
    dataTable,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    collections,
    totalRows: pageInfo?.total ?? 0
  };
};
