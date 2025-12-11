import { useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { type OrderState } from '@/lib/api/types';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useCountOrders } from '../../hooks/use-count-orders';
import { useGetOrders } from '../../hooks/use-get-orders';

import type { OrdersTableRow } from './orders-table';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const useOrdersTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState<OrderState | undefined>();

  const { isLoading: isLoadingCount, count } = useCountOrders();

  const {
    isLoading,
    isRefetching,
    orders: allOrders,
    pagination,
    refetch
  } = useGetOrders({
    filters: {
      ...(search && { code: { contains: search } }),
      ...(search && { customer: { contains: search } }),
      ...(state && { state })
    },
    skip: getSkip(page, size),
    take: size
  });

  useEffect(() => {
    refetch();
  }, [search, page, size, state]);

  const onUpdate = useDebouncedCallback((input: OnUpdateInput) => {
    if (input.search !== undefined) setSearch(input.search);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);

    if (input.state !== undefined) {
      const selectedState = input.state[0] as OrderState | undefined;
      setState(selectedState);
    }
  }, TYPING_DEBOUNCE_DELAY);

  const orders: OrdersTableRow[] = useMemo(
    (): OrdersTableRow[] =>
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

  return {
    onUpdate,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    orders,
    pagination
  };
};

type OnUpdateInput = {
  search?: string;
  page?: number;
  size?: number;
  state?: string[];
};
