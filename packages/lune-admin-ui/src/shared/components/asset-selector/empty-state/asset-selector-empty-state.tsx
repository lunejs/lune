import { Button, Muted, Small } from '@lunejs/ui';
import { ImageOffIcon, UploadCloudIcon } from 'lucide-react';

import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';

import { Dropzone } from '../../dropzone/dropzone';

export const AssetSelectorEmptyState = () => {
  const { isUploading, uploadAsset } = useUploadAsset();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 rounded-md py-6 col-span-full">
      <Button variant="outline" className="rounded-full w-9 h-9" type="button">
        <ImageOffIcon />
      </Button>
      <Small className="text-base leading-[100%]">You don't have any images yet</Small>
      <Muted>Upload your first to start using them</Muted>
      <Dropzone onDrop={acceptedFiles => uploadAsset(acceptedFiles)}>
        <Button variant="outline" type="button" isLoading={isUploading}>
          {!isUploading && <UploadCloudIcon />} Upload images
        </Button>
      </Dropzone>
    </div>
  );
};
