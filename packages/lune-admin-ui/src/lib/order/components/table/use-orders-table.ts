import { useEffect, useMemo } from 'react';

import { type OrderState } from '@/lib/api/types';
import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useCountOrders } from '../../hooks/use-count-orders';
import { useGetOrders } from '../../hooks/use-get-orders';

import type { OrdersTableRow } from './orders-table';

export const useOrdersTable = () => {
  const dataTable = useDataTable<OrderTableFilters>({
    search: '',
    state: undefined
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useCountOrders();

  const {
    isLoading,
    isRefetching,
    orders: allOrders,
    pagination: { pageInfo },
    refetch
  } = useGetOrders({
    filters: {
      ...(filters.search && { code: { contains: filters.search } }),
      ...(filters.search && { customer: { contains: filters.search } }),
      ...(filters.state && { state: filters.state })
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination]);

  const orders: OrdersTableRow[] = useMemo(
    () =>
      allOrders?.map(o => ({
        id: o.id,
        code: o.code ?? null,
        customer: o.customer
          ? `${o.customer.firstName ?? ''} ${o.customer.lastName ?? ''}`.trim() || o.customer.email
          : null,
        total: o.total,
        items: o.lines.count,
        state: o.state,
        shipment: o.fulfillment?.__typename === 'ShippingFulfillment' ? 'Shipping' : 'Pickup',
        placedAt: o.placedAt ?? null
      })) ?? [],
    [allOrders]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  const onStateFilterChange = (values: string[]) => {
    const selectedState = values[0] as OrderState | undefined;
    dataTable.updateFilters({ state: selectedState });
  };

  return {
    dataTable,
    onStateFilterChange,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    orders,
    totalRows: pageInfo?.total ?? 0
  };
};

type OrderTableFilters = {
  search: string;
  state: OrderState | undefined;
};
