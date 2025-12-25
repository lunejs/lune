import { useEffect, useMemo } from 'react';

import { useCustomObjectDefinitionsCount } from '@/lib/custom-object-definition/hooks/use-count-custom-object-definitions';
import { useGetCustomObjectDefinitions } from '@/lib/custom-object-definition/hooks/use-get-custom-object-definitions';
import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import type {
  CustomObjectDefinitionsTableFilters,
  CustomObjectDefinitionsTableRow
} from './custom-object-definitions-table';

export const useCustomObjectDefinitionsTable = () => {
  const dataTable = useDataTable<CustomObjectDefinitionsTableFilters>({
    search: ''
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useCustomObjectDefinitionsCount();

  const {
    isLoading,
    isRefetching,
    customObjectDefinitions: allDefinitions,
    pagination: { pageInfo },
    refetch
  } = useGetCustomObjectDefinitions({
    filters: {
      ...(filters.search && { name: { contains: filters.search } })
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination, refetch]);

  const customObjectDefinitions: CustomObjectDefinitionsTableRow[] = useMemo(
    () =>
      allDefinitions?.map(d => ({
        id: d.id,
        name: d.name,
        key: d.key,
        totalFields: d.fields?.length ?? 0
      })) ?? [],
    [allDefinitions]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  return {
    dataTable,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    customObjectDefinitions,
    totalRows: pageInfo?.total ?? 0
  };
};
