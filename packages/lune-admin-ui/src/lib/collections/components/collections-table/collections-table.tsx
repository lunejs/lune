import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@lunejs/ui';

import type { CollectionContentType } from '@/lib/api/types';
import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { CollectionTableActions } from './actions/collection-table-actions';
import { CollectionsTableColumns } from './columns';

export const CollectionsTable = ({ isRefetching, collections, totalRows, dataTable }: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;

  return (
    <DataTable
      isLoading={isRefetching}
      data={collections}
      columns={CollectionsTableColumns}
      searchPlaceholder="Search collections..."
      onSearch={q => updateFilters({ search: q })}
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      actions={
        <>
          <Button size="sm" variant="outline" className="hidden lg:flex">
            Import
          </Button>
          <Link to="/collections/new">
            <Button size="sm">
              <PlusIcon className="lg:hidden" />
              <span className="hidden lg:inline">Add Collection</span>
            </Button>
          </Link>
        </>
      }
      onSelectRender={rows => <CollectionTableActions rows={rows} />}
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

export type CollectionTableFilters = {
  search: string;
};

type Props = {
  isRefetching: boolean;
  collections: CollectionsTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<CollectionTableFilters>;
};
