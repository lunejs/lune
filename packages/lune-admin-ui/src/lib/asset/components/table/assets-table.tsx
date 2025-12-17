import { UploadCloudIcon } from 'lucide-react';

import { Button } from '@lune/ui';

import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';
import { Dropzone } from '@/shared/components/dropzone/dropzone';

import { useUploadAsset } from '../../hooks/use-upload-asset';

import { AssetsTableActions } from './actions/assets-table-actions';
import { AssetsTableColumns } from './columns';

export const AssetsTable = ({ isRefetching, assets, totalRows, dataTable }: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;
  const { isUploading, uploadAsset } = useUploadAsset();

  return (
    <DataTable
      isLoading={isRefetching}
      data={assets}
      columns={AssetsTableColumns}
      onSearch={q => updateFilters({ search: q })}
      searchPlaceholder="Search by asset or ext..."
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      actions={
        <Dropzone onDrop={acceptedFiles => uploadAsset(acceptedFiles)}>
          <Button size="sm" isLoading={isUploading}>
            {!isUploading && <UploadCloudIcon />}
            <span className="hidden lg:inline">Upload</span>
          </Button>
        </Dropzone>
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

type AssetTableFilters = {
  search: string;
};

type Props = {
  isRefetching: boolean;
  assets: AssetsTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<AssetTableFilters>;
};
