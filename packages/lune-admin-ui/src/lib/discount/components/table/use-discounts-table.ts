import { useEffect, useMemo, useState } from 'react';

import { getSkip } from '@/shared/utils/pagination.utils';

import { useGetDiscounts } from '../../hooks/use-get-discounts';

import type { DiscountsTableRow } from './discounts-table';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const useDiscountsTable = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const hasFiltersApplied = useMemo(() => {
    return !!query && page !== DEFAULT_PAGE && size !== DEFAULT_PAGE_SIZE;
  }, [query, page, size]);

  const {
    isLoading,
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

  const onUpdate = (input: OnUpdateInput) => {
    if (input.query !== undefined) setQuery(input.query);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);
  };

  return {
    hasFiltersApplied,
    discounts,
    onUpdate,
    isLoading,
    pagination
  };
};

type OnUpdateInput = {
  query?: string;
  page?: number;
  size?: number;
};
