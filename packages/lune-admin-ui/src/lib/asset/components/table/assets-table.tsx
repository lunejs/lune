import { UploadCloudIcon } from 'lucide-react';

import { Button } from '@lune/ui';

import { DataTable } from '@/shared/components/data-table/data-table';

import { AssetsTableActions } from './actions/assets-table-actions';
import { AssetsTableColumns } from './columns';
import { AssetsTableEmptyState } from './empty-state';
import { useAssetsTable } from './use-assets-table';

export const AssetsTable = () => {
  const { isLoading, isRefetching, shouldRenderEmptyState, products, pagination, onUpdate } =
    useAssetsTable();

  if (shouldRenderEmptyState) return <AssetsTableEmptyState />;

  return (
    <DataTable
      isLoading={isLoading || isRefetching}
      data={products}
      columns={AssetsTableColumns}
      onSearch={async q => onUpdate({ search: q })}
      searchPlaceholder="Search assets..."
      onPageChange={page => onUpdate({ page })}
      onPageSizeChange={size => onUpdate({ size })}
      totalRows={pagination.pageInfo?.total ?? 0}
      defaultPagination={{ page: 1, pageSize: 10 }}
      actions={
        <Button size="sm">
          <UploadCloudIcon />
          <span className="hidden lg:inline">Upload</span>
        </Button>
      }
      onSelectRender={rows => <AssetsTableActions rows={rows} />}
    />
  );
};

export type AssetsTableRow = {
  id: string;
  createdAt: Date;
  filename: string;
  ext: string;
  source: string;
  size: number;
};
