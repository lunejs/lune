import { SearchXIcon, UploadCloudIcon } from 'lucide-react';

import { Button, Muted, Small } from '@lune/ui';

import { Dropzone } from '../../dropzone/dropzone';

export const AssetSelectorNoMatchingFiltersState = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 rounded-md py-6 col-span-full">
      <Button variant="outline" className="rounded-full w-9 h-9" type="button">
        <SearchXIcon />
      </Button>
      <Small className="text-base leading-[100%]">No results found</Small>
      <Muted>Try a different search or upload an image</Muted>
      <Dropzone onDrop={acceptedFiles => console.log({ acceptedFiles })}>
        <Button variant="outline" type="button">
          <UploadCloudIcon /> Upload image
        </Button>
      </Dropzone>
    </div>
  );
};
