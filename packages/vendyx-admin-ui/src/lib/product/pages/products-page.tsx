import { PageLayout } from '@/lib/shared/components/layout/page-layout';

import { ProductsTable } from '../components/products-table/products-table';

export function ProductsPage() {
  return (
    <PageLayout>
      <ProductsTable />
    </PageLayout>
  );
}
