import { useEffect, useMemo, useState } from 'react';

import { getSkip } from '@/shared/utils/pagination.utils';

import { useGetProducts } from '../../hooks/use-get-products';

import type { TableProduct } from './products-table';

export const useProductsTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState<boolean | undefined>();

  const {
    isLoading,
    products: productsRaw,
    pagination,
    refetch
  } = useGetProducts({
    filters: {
      ...(search && { name: { contains: search } }),
      ...(status !== undefined && { enabled: { equals: status } })
    },
    skip: getSkip(page, size),
    take: size
  });

  const products: TableProduct[] = useMemo(
    (): TableProduct[] =>
      productsRaw?.map(p => ({
        id: p.id,
        image: p.assets.items[0]?.source,
        name: p.name,
        price: p.minSalePrice,
        status: p.enabled,
        totalStock: p.variants.items.reduce((acc, curr) => acc + curr.stock, 0),
        totalVariants: p.variants.items.length
      })) ?? [],
    [productsRaw]
  );

  useEffect(() => {
    refetch();
  }, [search, page, size, status]);

  const onUpdate = (input: OnUpdateInput) => {
    if (input.search !== undefined) setSearch(input.search);
    if (input.page) setPage(input.page);
    if (input.size) setSize(input.size);

    if (input.status?.length === 2 || !input.status?.length) {
      setStatus(undefined);
    } else {
      setStatus(input.status[0] === 'enabled');
    }
  };

  return {
    onUpdate,
    isLoading,
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
