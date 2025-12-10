import { useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useAssetsCount } from '../../hooks/use-assets-count';
import { useGetAssets } from '../../hooks/use-get-assets';

import type { AssetsTableRow } from './assets-table';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const useAssetsTable = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);

  const { isLoading: isLoadingCount, count } = useAssetsCount();

  const {
    isLoading,
    isRefetching,
    assets: allAssets,
    pagination,
    refetch
  } = useGetAssets({
    filters: {
      ...(query && { filename: { contains: query } })
    },
    skip: getSkip(page, size),
    take: size
  });

  useEffect(() => {
    refetch();
  }, [query, page, size]);

  const onUpdate = useDebouncedCallback((input: OnUpdateInput) => {
    if (input.search !== undefined) setQuery(input.search);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);
  }, TYPING_DEBOUNCE_DELAY);

  const assets: AssetsTableRow[] = useMemo(
    (): AssetsTableRow[] => allAssets?.map(a => ({ ...a, createdAt: new Date(a.createdAt) })) ?? [],
    [allAssets]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  return {
    onUpdate,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    products: assets,
    pagination
  };
};

type OnUpdateInput = {
  search?: string;
  page?: number;
  size?: number;
  status?: string[];
};
