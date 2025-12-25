import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { FulfillmentType, type OrderState } from '@/lib/api/types';
import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import { OrderParamFiltersKeys } from '../../constants/param-filters-keys';
import { useCountOrders } from '../../hooks/use-count-orders';
import { useGetOrders } from '../../hooks/use-get-orders';

import type { OrdersTableRow } from './orders-table';

export const useOrdersTable = () => {
  const [searchParams] = useSearchParams();

  const orderStateFilter = useMemo(
    () => searchParams.get(OrderParamFiltersKeys.OrderState) as OrderState,
    []
  );

  const customerEmailFilter = useMemo(
    () => searchParams.get(OrderParamFiltersKeys.CustomerEmail),
    []
  );

  const dataTable = useDataTable<OrderTableFilters>({
    search: customerEmailFilter ?? '',
    states: orderStateFilter ? [orderStateFilter] : []
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
      ...(filters.states && { states: filters.states })
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
        items: o.totalQuantity,
        state: o.state,
        fulfillment: o.fulfillment?.type === FulfillmentType.Shipping ? 'Shipping' : 'Pickup',
        placedAt: o.placedAt ?? null
      })) ?? [],
    [allOrders]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  return {
    dataTable,
    isLoading: isLoading,
    isRefetching,
    shouldRenderEmptyState,
    orders,
    totalRows: pageInfo?.total ?? 0
  };
};

type OrderTableFilters = {
  search: string;
  states: OrderState[];
};
