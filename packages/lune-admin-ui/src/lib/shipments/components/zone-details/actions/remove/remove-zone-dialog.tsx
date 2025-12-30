import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@lunejs/ui';

import type { CommonZoneFragment } from '@/lib/api/types';

import { useRemoveZoneDialog } from './use-remove-zone-dialog';

export const RemoveZoneDialog = ({ zone, isOpen, setIsOpen }: Props) => {
  const { removeZone } = useRemoveZoneDialog();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove zone "{zone.name}"</AlertDialogTitle>
          <AlertDialogDescription>You will stop shipping to this zone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeZone(zone.id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  zone: CommonZoneFragment;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};
