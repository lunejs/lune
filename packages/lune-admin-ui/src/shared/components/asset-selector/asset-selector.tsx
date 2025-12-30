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
} from '@lunejs/ui';

import type { CommonAssetFragment } from '@/lib/api/types';

import { AssetSelectorList } from './list/asset-selector-list';

/**
 * @description
 * A dialog component that allows users to select one or multiple assets from the store's asset library.
 *
 * @example
 * // Uncontrolled usage with trigger button
 * <AssetSelector onDone={assets => saveInEntity(assets)}>
 *   <Button>Select Assets</Button>
 * </AssetSelector>
 *
 * @example
 * // Controlled usage
 * const [isOpen, setIsOpen] = useState(false);
 * <AssetSelector
 *   isOpen={isOpen}
 *   setIsOpen={setIsOpen}
 *   onDone={(assets) => {
 *     console.log('Selected assets:', assets);
 *     setIsOpen(false);
 *   }}
 * />
 *
 * @example
 * // Using in a form field
 * <AssetSelector onDone={(assets) => setValue('productImages', assets)}>
 *   <Button variant="outline">Choose Product Images</Button>
 * </AssetSelector>
 */
export const AssetSelector: FC<Props> = ({
  onDone,
  defaultSelected = [],
  isOpen,
  setIsOpen,
  children
}) => {
  const [selected, setSelected] = useState<SelectedAsset[]>(defaultSelected);

  // useEffect(() => {
  //   if (!selected.length) setSelected(defaultSelected);
  // }, [defaultSelected]);

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent forceMount className="flex flex-col h-[85vh] max-w-[980px]! gap-0 w-full p-0">
        <DialogHeader className="pt-6 px-6 mb-4 h-fit">
          <DialogTitle>Select Assets</DialogTitle>
        </DialogHeader>

        <AssetSelectorList selected={selected} setSelected={setSelected} />

        <DialogFooter className="border-t p-6 h-fit shrink-0">
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          {isOpen === undefined ? (
            <DialogClose asChild>
              <Button onClick={() => onDone(selected as CommonAssetFragment[])}>Done</Button>
            </DialogClose>
          ) : (
            <Button onClick={() => onDone(selected as CommonAssetFragment[])}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  /** Callback invoked when the user confirms their asset selection by clicking "Done". */
  onDone: (assets: CommonAssetFragment[]) => void;

  /** Default selected assets */
  defaultSelected?: SelectedAsset[];

  /**
   * Optional trigger element that opens the asset selector when clicked.
   * Typically a button or other interactive element.
   */
  children?: ReactNode;

  /** Controls the dialog's open state. Use together with `setIsOpen` for controlled behavior. */
  isOpen?: boolean;

  /** Callback to update the dialog's open state. Use together with `isOpen` for controlled behavior. */
  setIsOpen?: (isOpen: boolean) => void;
};

type SelectedAsset = { id: string; source: string };
