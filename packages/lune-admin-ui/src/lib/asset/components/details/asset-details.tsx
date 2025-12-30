import type { ReactNode } from 'react';

import { filesize } from '@lunejs/common';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@lunejs/ui';

import type { CommonAssetFragment } from '@/lib/api/types';

export const AssetDetails = ({ asset, children }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{asset.filename}</SheetTitle>
          <SheetDescription>
            {asset.ext.toUpperCase()} - {filesize(asset.size)}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-4">
          <img src={asset.source} alt={asset.filename} className="rounded-md" />
          {/* <div className="flex flex-col gap-2">
            <Button variant={'outline'}>
              <ReplaceIcon />
              Replace
            </Button>
            <Button variant={'destructive'}>
              <Trash2Icon />
              Remove
            </Button>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

type Props = {
  asset: CommonAssetFragment;
  children: ReactNode;
};
