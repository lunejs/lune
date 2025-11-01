import { useEffect, useMemo, useState } from 'react';

import { CollectionContentType } from '@/lib/api/types';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useGetCollections } from '../../hooks/use-get-collections';
import { useGetCollectionsExists } from '../../hooks/use-get-collections-extist';

import type { CollectionsTableRow } from './collections-table';

export const useCollectionsTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { isLoading: isLoadingCollectionsExist, hasCollections } = useGetCollectionsExists();

  const {
    isLoading,
    collections: collectionsRaw,
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

  const collections: CollectionsTableRow[] = useMemo(
    (): CollectionsTableRow[] =>
      collectionsRaw?.map(c => ({
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
    [collectionsRaw]
  );

  useEffect(() => {
    refetch();
  }, [search, page, size]);

  const onUpdate = (input: OnUpdateInput) => {
    if (input.search !== undefined) setSearch(input.search);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);
  };

  return {
    onUpdate,
    isLoading: isLoading || isLoadingCollectionsExist,
    hasCollections,
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
