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

import type { CommonProductFragment } from '@/lib/api/types';

import { useRemoveProductButton } from './use-remove-product-button';

export const RemoveProduct = ({ isOpen, setIsOpen, product }: Props) => {
  const { removeProduct } = useRemoveProductButton();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove product "{product.name}"</AlertDialogTitle>
          <AlertDialogDescription>
            By removing this product you will also remove all related information, media files,
            variants and options. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeProduct(product.id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product: CommonProductFragment;
};
