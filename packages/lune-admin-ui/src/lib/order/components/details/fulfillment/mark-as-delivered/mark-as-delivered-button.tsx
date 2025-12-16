import { useState } from 'react';
import { PackageCheckIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

import { useMarkAsDeliveredButton } from './use-mark-as-delivered-button';

export const MarkAsDeliveredButton = ({ order }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { markAsDelivered, isLoading } = useMarkAsDeliveredButton(() => setIsOpen(false));

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PackageCheckIcon size={16} /> Mark as delivered
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark order as delivered</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark order #{order.code} as delivered. The customer will be notified.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button isLoading={isLoading} onClick={() => markAsDelivered(order.id)}>
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
