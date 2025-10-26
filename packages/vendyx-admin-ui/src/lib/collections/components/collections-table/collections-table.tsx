import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@vendyx/ui';

import { CollectionContentType } from '@/lib/api/types';
import { DataTable } from '@/shared/components/data-table/data-table';

import { CollectionsTableColumns } from './columns';
import { CollectionsTableEmptyState } from './empty-state';
import { useCollectionsTable } from './use-collections-table';

export const CollectionsTable = () => {
  const { isLoading, hasCollections, onUpdate, collections, pagination } = useCollectionsTable();

  if (!hasCollections && !isLoading) return <CollectionsTableEmptyState />;

  return (
    <DataTable
      isLoading={isLoading}
      data={collections}
      columns={CollectionsTableColumns}
      searchPlaceholder="Search collections..."
      onSearch={async q => onUpdate({ search: q })}
      onPageChange={page => onUpdate({ page })}
      onPageSizeChange={size => onUpdate({ size })}
      totalRows={pagination.pageInfo?.total ?? 0}
      defaultPagination={{ page: 1, pageSize: 10 }}
      filters={[
        {
          title: 'Content type',
          options: [
            { label: 'Products', value: CollectionContentType.Products },
            { label: 'Collections', value: CollectionContentType.Collections }
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
      // onSelectRender={rows => <ProductTableActions rows={rows} />}
    />
  );
};

export type CollectionsTableRow = {
  id: string;
  name: string;
  image: string;
  totalContent: number;
  status: boolean;
  contentType: CollectionContentType;
};
