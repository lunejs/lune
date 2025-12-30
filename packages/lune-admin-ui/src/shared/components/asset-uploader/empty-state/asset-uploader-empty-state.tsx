import { useId, useState } from 'react';
import { ImageIcon, UploadCloudIcon } from 'lucide-react';

import { Button, Label, Muted, Small } from '@lunejs/ui';

import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';

import { AssetSelector } from '../../asset-selector/asset-selector';
import { Dropzone } from '../../dropzone/dropzone';

export const AssetUploaderEmptyState = ({ onAssetsAdd }: Props) => {
  const inputId = useId();
  const { isUploading, uploadAsset } = useUploadAsset();
  const [isAssetSelectorOpen, setIsAssetSelectorOpen] = useState(false);

  return (
    <>
      <Dropzone
        onDrop={async acceptedFiles => {
          const assets = await uploadAsset(acceptedFiles);
          onAssetsAdd(assets.data);
        }}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor={inputId}>Assets</Label>
          <div className="w-full h-full flex flex-col items-center gap-2.5 rounded-md border-dashed border py-6">
            <Button variant="outline" className="rounded-full w-9 h-9" type="button">
              <ImageIcon />
            </Button>
            <Small className="text-base leading-[100%]">Drop your images</Small>
            <Muted>SVG, PNG, JPG or GIF (max. 5MB)</Muted>
            <div className="flex items-center gap-2">
              <Button variant="outline" type="button" isLoading={isUploading}>
                {!isUploading && <UploadCloudIcon />} Upload images
              </Button>
              <Button
                variant="link"
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setIsAssetSelectorOpen(true);
                }}
              >
                Select existing
              </Button>
            </div>
          </div>
        </div>
      </Dropzone>
      <AssetSelector
        onDone={onAssetsAdd}
        isOpen={isAssetSelectorOpen}
        setIsOpen={setIsAssetSelectorOpen}
      />
    </>
  );
};

type Props = {
  onAssetsAdd: (assets: { id: string; source: string }[]) => void;
};
