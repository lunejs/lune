import { useEffect, useMemo } from 'react';

import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useCountDiscounts } from '../../hooks/use-count-discounts';
import { useGetDiscounts } from '../../hooks/use-get-discounts';

import type { DiscountsTableRow } from './discounts-table';

export const useDiscountsTable = () => {
  const dataTable = useDataTable<DiscountTableFilters>({
    search: ''
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useCountDiscounts();

  const {
    isLoading,
    isRefetching,
    discounts: allDiscounts,
    pagination: { pageInfo },
    refetch
  } = useGetDiscounts({
    filters: {
      ...(filters.search && { code: { contains: filters.search } })
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination]);

  const discounts: DiscountsTableRow[] = useMemo(() => allDiscounts, [allDiscounts]);

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  return {
    dataTable,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    discounts,
    totalRows: pageInfo?.total ?? 0
  };
};

type DiscountTableFilters = {
  search: string;
};
