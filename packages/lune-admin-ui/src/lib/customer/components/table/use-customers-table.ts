import { useEffect, useMemo } from 'react';

import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useCountCustomers } from '../../hooks/use-count-customers';
import { useGetCustomers } from '../../hooks/use-get-customers';

import type { CustomersTableRow } from './customers-table';

export const useCustomersTable = () => {
  const dataTable = useDataTable<CustomerTableFilters>({
    search: '',
    enabled: undefined
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useCountCustomers();

  const {
    isLoading,
    isRefetching,
    customers: allCustomers,
    pagination: { pageInfo },
    refetch
  } = useGetCustomers({
    filters: {
      ...(filters.search && { firstName: { contains: filters.search } }),
      ...(filters.search && { lastName: { contains: filters.search } }),
      ...(filters.search && { email: { contains: filters.search } }),
      ...(filters.enabled !== undefined && { enabled: { equals: filters.enabled } })
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination]);

  const customers: CustomersTableRow[] = useMemo(
    () =>
      allCustomers?.map(c => ({
        id: c.id,
        firstName: c.firstName ?? null,
        lastName: c.lastName ?? null,
        email: c.email,
        ordersCount: c.orders.count,
        totalSpent: c.totalSpent,
        enabled: c.enabled
      })) ?? [],
    [allCustomers]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  const onStatusFilterChange = (values: string[]) => {
    const selectedStatus = values[0];
    const enabled =
      selectedStatus === 'true' ? true : selectedStatus === 'false' ? false : undefined;
    dataTable.updateFilters({ enabled });
  };

  return {
    dataTable,
    onStatusFilterChange,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    customers,
    totalRows: pageInfo?.total ?? 0
  };
};

type CustomerTableFilters = {
  search: string;
  enabled: boolean | undefined;
};
