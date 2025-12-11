import { PageLayout } from '@/shared/components/layout/page-layout';

import { ProductsTableEmptyState } from '../components/products-table/empty-state';
import { ProductsTable } from '../components/products-table/products-table';
import { useProductsTable } from '../components/products-table/use-products-table';

export function ProductsPage() {
  const table = useProductsTable();

  return (
    <PageLayout isLoading={table.isLoading}>
      {table.shouldRenderEmptyState ? <ProductsTableEmptyState /> : <ProductsTable {...table} />}
    </PageLayout>
  );
}
