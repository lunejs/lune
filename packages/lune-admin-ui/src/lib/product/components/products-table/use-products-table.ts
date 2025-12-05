import { useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { isArray } from '@lune/common';

import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useGetProducts } from '../../hooks/use-get-products';

import type { TableProduct } from './products-table';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const useProductsTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [status, setStatus] = useState<boolean | undefined>();
  const [archived, setArchived] = useState<boolean | undefined>();

  const {
    isFetched,
    isLoading,
    isRefetching,
    products: allProducts,
    pagination,
    refetch
  } = useGetProducts({
    filters: {
      ...(search && { name: { contains: search } }),
      ...(status !== undefined && { enabled: { equals: status } }),
      ...(archived !== undefined
        ? { archived: { equals: archived } }
        : { archived: { equals: false } })
    },
    skip: getSkip(page, size),
    take: size
  });

  useEffect(() => {
    refetch();
  }, [search, page, size, status, archived]);

  const onUpdate = useDebouncedCallback((input: OnUpdateInput) => {
    if (input.search !== undefined) setSearch(input.search);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);

    if (isArray(input.status)) {
      setArchived(input.status.includes('archived'));

      if (input.status.includes('enabled')) {
        setStatus(true);
      } else if (input.status.includes('disabled')) {
        setStatus(false);
      } else {
        setStatus(undefined);
      }
    }
  }, TYPING_DEBOUNCE_DELAY);

  const products: TableProduct[] = useMemo(
    (): TableProduct[] =>
      allProducts?.map(p => ({
        id: p.id,
        image: p.assets.items[0]?.source,
        name: p.name,
        price: p.minSalePrice,
        status: p.enabled,
        totalStock: p.variants.items.reduce((acc, curr) => acc + curr.stock, 0),
        totalVariants: p.variants.items.length
      })) ?? [],
    [allProducts]
  );

  const hasFiltersApplied = useMemo(() => {
    return (
      !!search ||
      page !== DEFAULT_PAGE ||
      size !== DEFAULT_PAGE_SIZE ||
      status !== undefined ||
      archived !== undefined
    );
  }, [search, page, size, status, archived]);

  const shouldRenderEmptyState = useMemo(() => {
    return isFetched && !isLoading && !hasFiltersApplied && !products.length;
  }, [isFetched, isLoading, hasFiltersApplied, products.length]);

  return {
    onUpdate,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    products,
    pagination
  };
};

type OnUpdateInput = {
  search?: string;
  page?: number;
  size?: number;
  status?: string[];
};
