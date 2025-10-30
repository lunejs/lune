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

import type { TableProduct } from '../../products-table';

import { useRemoveMassiveProducts } from './use-remove-massive-products';

export const RemoveMassiveProducts = ({ isOpen, setIsOpen, rows }: Props) => {
  const { removeMassiveProducts } = useRemoveMassiveProducts();

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
          <AlertDialogAction onClick={() => removeMassiveProducts(rows.map(r => r.id))}>
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
  rows: TableProduct[];
};
