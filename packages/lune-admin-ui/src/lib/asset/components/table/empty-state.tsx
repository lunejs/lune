import { Button } from '@lunejs/ui';
import { ImageOffIcon, UploadCloudIcon } from 'lucide-react';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';
import { Dropzone } from '@/shared/components/dropzone/dropzone';

import { useUploadAsset } from '../../hooks/use-upload-asset';

export const AssetsTableEmptyState = () => {
  const { isUploading, uploadAsset } = useUploadAsset();

  return (
    <DataTableEmptyState
      title="No Assets added"
      subtitle="Upload your first to start using them"
      icon={<ImageOffIcon />}
      actions={
        <Dropzone onDrop={acceptedFiles => uploadAsset(acceptedFiles)}>
          <Button isLoading={isUploading}>
            {!isUploading && <UploadCloudIcon />}
            Upload
          </Button>
        </Dropzone>
      }
    />
  );
};
