import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@vendyx/ui';

import type { CommonProductFragment } from '@/lib/api/types';

import { useArchiveProductButton } from './use-archive-product-button';

export const ArchiveProduct = ({ isOpen, setIsOpen, product }: Props) => {
  const { archiveProduct } = useArchiveProductButton();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive product "{product.name}"</AlertDialogTitle>
          <AlertDialogDescription>
            By Archiving this product you will persist all data related to this product but wont be
            show in storefront and in default table views
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => archiveProduct(product.id)}>Continue</AlertDialogAction>
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
