import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  FormMessage
} from '@lunejs/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { useCompleteOrderAlert } from './use-complete-order-alert';

export const CompleteOrderAlert = ({ order, isOpen, setIsOpen }: Props) => {
  const { error, isLoading, handleConfirm } = useCompleteOrderAlert(() => setIsOpen(false));

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark order as completed</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark order {order.code} as completed. This action indicates the order has been
            fully fulfilled and delivered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <FormMessage>{error}</FormMessage>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button onClick={() => handleConfirm(order.id)} isLoading={isLoading}>
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  order: CommonOrderFragment;
};
