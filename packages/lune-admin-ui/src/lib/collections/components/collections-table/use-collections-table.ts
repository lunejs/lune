import { useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { CollectionContentType } from '@/lib/api/types';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useCollectionsCount } from '../../hooks/use-count-collections';
import { useGetCollections } from '../../hooks/use-get-collections';

import type { CollectionsTableRow } from './collections-table';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const useCollectionsTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);

  const { isLoading: isLoadingCollectionCount, count } = useCollectionsCount();

  const {
    isLoading,
    isRefetching,
    collections: allCollections,
    pagination,
    refetch
  } = useGetCollections({
    filters: {
      ...(search && { name: { contains: search } }),
      isTopLevel: { equals: true }
    },
    skip: getSkip(page, size),
    take: size
  });

  useEffect(() => {
    refetch();
  }, [search, page, size]);

  const onUpdate = useDebouncedCallback((input: OnUpdateInput) => {
    if (input.search !== undefined) setSearch(input.search);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);
  }, TYPING_DEBOUNCE_DELAY);

  const collections: CollectionsTableRow[] = useMemo(
    (): CollectionsTableRow[] =>
      allCollections?.map(c => ({
        id: c.id,
        image: c.assets.items[0]?.source,
        name: c.name,
        status: c.enabled,
        totalContent:
          c.contentType === CollectionContentType.Products
            ? c.products.count
            : c.subCollections.count,
        contentType: c.contentType
      })) ?? [],
    [allCollections]
  );

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCollectionCount && !count;
  }, [isLoading, isLoadingCollectionCount, count]);

  return {
    onUpdate,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    collections,
    pagination
  };
};

type OnUpdateInput = {
  search?: string;
  page?: number;
  size?: number;
  status?: string[];
};
