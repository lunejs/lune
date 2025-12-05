import { useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useCountDiscounts } from '../../hooks/use-count-discounts';
import { useGetDiscounts } from '../../hooks/use-get-discounts';

import type { DiscountsTableRow } from './discounts-table';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const useDiscountsTable = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);

  const { isLoading: isLoadingCount, count } = useCountDiscounts();

  const {
    isLoading,
    isRefetching,
    discounts: allDiscounts,
    pagination,
    refetch
  } = useGetDiscounts({
    filters: {
      ...(query && { code: { contains: query } })
    },
    skip: getSkip(page, size),
    take: size
  });

  const discounts = useMemo((): DiscountsTableRow[] => allDiscounts, [allDiscounts]);

  useEffect(() => {
    refetch();
  }, [query, page, size]);

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  const onUpdate = useDebouncedCallback((input: OnUpdateInput) => {
    if (input.query !== undefined) setQuery(input.query);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);
  }, TYPING_DEBOUNCE_DELAY);

  return {
    shouldRenderEmptyState,
    discounts,
    onUpdate,
    isRefetching,
    isLoading,
    pagination
  };
};

type OnUpdateInput = {
  query?: string;
  page?: number;
  size?: number;
};
