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

import type { DiscountsTableRow } from '../../discounts-table';

import { useRemoveDiscountsButton } from './use-remove-discounts-button';

export const RemoveDiscounts = ({ isOpen, setIsOpen, rows }: Props) => {
  const { removeDiscounts } = useRemoveDiscountsButton();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove all selected discounts</AlertDialogTitle>
          <AlertDialogDescription>
            By removing these discounts, you will no longer be able to use them in your store. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeDiscounts(rows.map(r => r.id))}>
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
  rows: DiscountsTableRow[];
};
