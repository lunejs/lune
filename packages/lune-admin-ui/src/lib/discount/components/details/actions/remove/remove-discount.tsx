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

import type { CommonDiscountFragment } from '@/lib/api/types';

import { useRemoveDiscountButton } from './use-remove-discount-button';

export const RemoveDiscount = ({ isOpen, setIsOpen, discount }: Props) => {
  const { removeDiscount } = useRemoveDiscountButton();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove discount "{discount.code}"</AlertDialogTitle>
          <AlertDialogDescription>
            By removing this discount, you will no longer be able to use them in your store. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeDiscount(discount.id)}>
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
  discount: CommonDiscountFragment;
};
