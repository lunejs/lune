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
} from '@lune/ui';

import type { CollectionsTableRow } from '../../collections-table';

import { useRemoveMassiveCollections } from './use-remove-massive-collections';

export const RemoveMassiveCollections = ({ isOpen, setIsOpen, rows }: Props) => {
  const { removeMassiveCollections } = useRemoveMassiveCollections();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove all selected collections</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeMassiveCollections(rows.map(r => r.id))}>
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
  rows: CollectionsTableRow[];
};
