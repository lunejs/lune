import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { isArray } from '@lunejs/common';
import { Button } from '@lunejs/ui';

import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { ProductTableActions } from './actions/product-table-actions';
import { ProductsTableColumns } from './columns';

export const ProductsTable = ({ isRefetching, products, totalRows, dataTable }: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;

  return (
    <DataTable
      isLoading={isRefetching}
      data={products}
      columns={ProductsTableColumns}
      onSearch={q => updateFilters({ search: q })}
      searchPlaceholder="Search products..."
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      filters={[
        {
          title: 'Status',
          options: [
            { label: 'Published', value: 'enabled' },
            { label: 'Unpublished', value: 'disabled' },
            { label: 'Archived', value: 'archived' }
          ],
          onChange: values => {
            if (!isArray(values)) return;

            updateFilters({
              archived: values.includes('archived'),
              enabled: values.includes('enabled')
                ? true
                : values.includes('disabled')
                  ? false
                  : undefined
            });
          }
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

export type ProductTableFilters = {
  search: string;
  archived: boolean;
  enabled: boolean | undefined;
};

type Props = {
  isRefetching: boolean;
  products: TableProduct[];
  totalRows: number;
  dataTable: UseDataTableReturn<ProductTableFilters>;
};
