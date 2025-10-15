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
} from '@vendyx/ui';

import { useRemoveProducts } from '@/lib/product/hooks/use-remove-product';

import type { TableProduct } from '../../products-table';

export const RemoveProducts = ({ isOpen, setIsOpen, products }: Props) => {
  const { removeProducts } = useRemoveProducts();

  const onClick = async () => {
    removeProducts(products.map(p => p.id));
  };

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
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  products: TableProduct[];
};
