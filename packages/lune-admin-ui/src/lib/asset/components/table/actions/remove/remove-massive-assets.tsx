import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@lunejs/ui';

import type { AssetsTableRow } from '../../assets-table';

import { useRemoveMassiveAssets } from './use-remove-massive-assets';

export const RemoveMassiveAssets = ({ isOpen, setIsOpen, rows }: Props) => {
  const { removeMassiveAssets } = useRemoveMassiveAssets();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove all selected products</AlertDialogTitle>
          <AlertDialogDescription>
            By removing the products you will also remove all related information, media files,
            variants and options. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeMassiveAssets(rows.map(r => r.id))}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  rows: AssetsTableRow[];
};
