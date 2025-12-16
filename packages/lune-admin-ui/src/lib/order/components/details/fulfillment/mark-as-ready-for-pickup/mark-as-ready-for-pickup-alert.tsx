import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  FormMessage
} from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { useReadyForPickupAlert } from './use-ready-for-pickup-alert';

export const MarkAsReadyForPickupAlert = ({ order }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { error, isLoading, handleConfirm } = useReadyForPickupAlert(() => setIsOpen(false));

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size={'sm'} variant={'outline'}>
          Mark as Ready for pickup
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark order as ready for pickup</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark order {order.code} as ready for pickup. The customer will be notified
            that their order is ready to be collected.
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
  order: CommonOrderFragment;
};
