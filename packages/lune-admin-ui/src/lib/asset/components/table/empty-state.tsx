import { ImageOffIcon, UploadCloudIcon } from 'lucide-react';

import { Button } from '@lune/ui';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const AssetsTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No Assets added"
      subtitle="Upload your first to start using them"
      icon={<ImageOffIcon />}
      actions={
        <Button>
          <UploadCloudIcon />
          Upload
        </Button>
      }
    />
  );
};
