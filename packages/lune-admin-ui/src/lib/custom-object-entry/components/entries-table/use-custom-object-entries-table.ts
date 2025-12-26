import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';
import { useCountCustomObjectEntries } from '@/lib/custom-object-entry/hooks/use-count-custom-object-entries';
import { useGetCustomObjectEntries } from '@/lib/custom-object-entry/hooks/use-get-custom-object-entries';
import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import type {
  CustomObjectEntriesTableFilters,
  CustomObjectEntriesTableRow
} from './custom-object-entries-table';

export const useCustomObjectEntriesTable = (
  definition: CommonCustomObjectDefinitionFragment | undefined | null
) => {
  const { id } = useParams() as { id: string };

  const dataTable = useDataTable<CustomObjectEntriesTableFilters>({
    search: ''
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useCountCustomObjectEntries(id);

  const {
    isLoading,
    isRefetching,
    customObjectEntries: allEntries,
    pagination: { pageInfo },
    refetch
  } = useGetCustomObjectEntries(id, {
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination, refetch]);

  const customObjectEntries: CustomObjectEntriesTableRow[] = useMemo(
    () =>
      allEntries?.map(entry => {
        const displayFieldValue = entry?.values.find(
          v => v.field.id === definition?.displayField?.id
        );

        return {
          id: entry.id,
          definitionId: id,
          slug: entry.slug,
          title: displayFieldValue?.value ?? `${definition?.name}#${entry.slug.toUpperCase()}`,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
          valuesCount: entry.values?.length ?? 0
        };
      }) ?? [],
    [allEntries, definition]
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
