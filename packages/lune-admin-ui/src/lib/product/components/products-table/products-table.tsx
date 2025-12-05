import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@lune/ui';

import { DataTable } from '@/shared/components/data-table/data-table';

import { ProductTableActions } from './actions/product-table-actions';
import { ProductsTableColumns } from './columns';
import { ProductsTableEmptyState } from './empty-state';
import { useProductsTable } from './use-products-table';

export const ProductsTable = () => {
  const { isLoading, isRefetching, hasNoProducts, products, pagination, onUpdate } =
    useProductsTable();

  if (hasNoProducts && !isLoading) return <ProductsTableEmptyState />;

  return (
    <DataTable
      isLoading={isLoading || isRefetching}
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
            { label: 'Published', value: 'enabled' },
            { label: 'Unpublished', value: 'disabled' },
            { label: 'Archived', value: 'archived' }
          ],
          onChange: status => onUpdate({ status })
        }
      ]}
      actions={
        <>
          <Button size="sm" variant="outline" className="hidden lg:flex">
            Import
          </Button>
          <Link to="/products/new">
            <Button size="sm">
              <PlusIcon className="lg:hidden" />
              <span className="hidden lg:inline">Add Product</span>
            </Button>
          </Link>
        </>
      }
      onSelectRender={rows => <ProductTableActions rows={rows} />}
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
