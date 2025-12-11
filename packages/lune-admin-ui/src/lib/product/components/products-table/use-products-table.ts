import { useEffect, useMemo } from 'react';

import { useDataTable } from '@/shared/components/data-table/use-data-table';
import { getSkip } from '@/shared/utils/pagination.utils';

import { useGetProducts } from '../../hooks/use-get-products';
import { useProductsCount } from '../../hooks/use-products-count';

import type { ProductTableFilters, TableProduct } from './products-table';

export const useProductsTable = () => {
  const dataTable = useDataTable<ProductTableFilters>({
    search: '',
    enabled: undefined,
    archived: false
  });

  const { filters, pagination } = dataTable;

  const { isLoading: isLoadingCount, count } = useProductsCount();

  const {
    isLoading,
    isRefetching,
    products: allProducts,
    pagination: { pageInfo },
    refetch
  } = useGetProducts({
    filters: {
      ...(filters.search && { name: { contains: filters.search } }),
      ...(filters.enabled !== undefined && { enabled: { equals: filters.enabled } }),
      archived: { equals: filters.archived }
    },
    skip: getSkip(pagination.page, pagination.size),
    take: pagination.size
  });

  useEffect(() => {
    refetch();
  }, [filters, pagination]);

  const products: TableProduct[] = useMemo(
    () =>
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

  const shouldRenderEmptyState = useMemo(() => {
    return !isLoading && !isLoadingCount && !count;
  }, [isLoading, isLoadingCount, count]);

  return {
    dataTable,
    isLoading,
    isRefetching,
    shouldRenderEmptyState,
    products,
    totalRows: pageInfo?.total ?? 0
  };
};
