import { useEffect, useMemo } from 'react';

import { useCountCustomObjectEntries } from '@/lib/custom-object-entry/hooks/use-count-custom-object-entries';
import { useGetCustomObjectEntries } from '@/lib/custom-object-entry/hooks/use-get-custom-object-entries';
import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import type {
  CustomObjectEntriesTableFilters,
  CustomObjectEntriesTableRow
} from './custom-object-entries-table';

export const useCustomObjectEntriesTable = (definitionId: string) => {
  const dataTable = useDataTable<CustomObjectEntriesTableFilters>({
    search: ''
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useCountCustomObjectEntries(definitionId);

  const {
    isLoading,
    isRefetching,
    customObjectEntries: allEntries,
    pagination: { pageInfo },
    refetch
  } = useGetCustomObjectEntries(definitionId, {
    filters: {
      ...(filters.search && { slug: { contains: filters.search } })
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination, refetch]);

  const customObjectEntries: CustomObjectEntriesTableRow[] = useMemo(
    () =>
      allEntries?.map(entry => ({
        id: entry.id,
        slug: entry.slug,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        valuesCount: entry.values?.length ?? 0
      })) ?? [],
    [allEntries]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  return {
    dataTable,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    customObjectEntries,
    totalRows: pageInfo?.total ?? 0
  };
};
