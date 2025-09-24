import { PlusIcon } from 'lucide-react';

import { Button } from '@vendyx/ui';

import { DataTable } from '@/lib/shared/components/data-table/data-table';

import { ProductsTableColumns } from './columns';
import { ProductsTableEmptyState } from './empty-state';
import { useProductsTable } from './use-products-table';

export const ProductsTable = () => {
  const { isLoading, products, pagination, onUpdate } = useProductsTable();

  if (isLoading) return null;

  if (pagination.pageInfo?.total === 0) return <ProductsTableEmptyState />;

  return (
    <DataTable
      data={products}
      columns={ProductsTableColumns}
      onSearch={async q => onUpdate({ search: q })}
      searchPlaceholder="Search products..."
      onPageChange={page => onUpdate({ page })}
      onPageSizeChange={size => onUpdate({ size })}
      totalRows={pagination.pageInfo?.total ?? 0}
      defaultPagination={{ page: 1, pageSize: 10 }}
      filters={[
        {
          title: 'Status',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' }
          ],
          onChange: status => onUpdate({ status })
        }
      ]}
      actions={
        <>
          <Button size="sm" variant="outline" className="hidden lg:flex">
            Import
          </Button>
          <Button size="sm">
            <PlusIcon /> <span className="hidden lg:inline">Add Product</span>
          </Button>
        </>
      }
    />
  );
};

export type TableProduct = {
  id: string;
  name: string;
  image: string;
  totalStock: number;
  price: number;
  totalVariants: number;
  status: boolean;
};
