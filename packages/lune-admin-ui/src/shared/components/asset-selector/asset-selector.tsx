import { type FC, type ReactNode, useState } from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@lune/ui';

import type { CommonAssetFragment } from '@/lib/api/types';

import { AssetSelectorList } from './list/asset-selector-list';

/**
 * @description
 * A dialog where you can select available assets in the store
 *
 * @example
 * <AssetSelector onDone={assets => saveInEntity(assets)}>
 *  <Button>Upload</Button>
 * </AssetSelector>
 */
export const AssetSelector: FC<Props> = ({ onDone, isOpen, setIsOpen, children }) => {
  const [selected, setSelected] = useState<CommonAssetFragment[]>([]);

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent forceMount className="flex flex-col h-[85vh] max-w-[980px]! gap-0 w-full p-0">
        <DialogHeader className="pt-6 px-6 mb-4 h-fit">
          <DialogTitle>Select Assets</DialogTitle>
        </DialogHeader>

        <AssetSelectorList setSelected={setSelected} />

        <DialogFooter className="border-t p-6 h-fit shrink-0">
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button onClick={() => onDone(selected)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  children?: ReactNode;
  onDone: (assets: CommonAssetFragment[]) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
};
