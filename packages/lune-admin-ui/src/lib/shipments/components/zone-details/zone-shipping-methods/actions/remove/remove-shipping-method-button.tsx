import { XIcon } from 'lucide-react';

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

import type { CommonZoneFragment } from '@/lib/api/types';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';

export const RemovingShippingMethodButton = ({ method, isRemoving, onClick }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground p-2 hover:bg-muted transition-colors rounded-sm cursor-pointer disabled:pointer-events-none"
        >
          {isRemoving ? <SpinnerLoader /> : <XIcon size={16} />}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove shipping method "{method.name}"</AlertDialogTitle>
          <AlertDialogDescription>
            You will not be able to accept orders with this shipping method. This action cannot be
            undone.
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
  method: CommonZoneFragment['shippingMethods'][0];
  isRemoving: boolean;
  onClick: () => void;
};
