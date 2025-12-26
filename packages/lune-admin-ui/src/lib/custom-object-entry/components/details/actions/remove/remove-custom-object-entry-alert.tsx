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

import type { CommonCustomObjectEntryFragment } from '@/lib/api/types';
import { getDisplayFieldValue } from '@/lib/custom-fields/utils/custom-field.utils';

import { useCustomObjectEntryFormContext } from '../../use-form/use-form';

import { useRemoveCustomObjectEntryAlert } from './use-remove-custom-object-entry-alert';

export const RemoveCustomObjectEntryAlert = ({ isOpen, setIsOpen, entry }: Props) => {
  const { definition } = useCustomObjectEntryFormContext();
  const { removeCustomObjectEntry } = useRemoveCustomObjectEntryAlert();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Remove entry "{getDisplayFieldValue(entry, definition)}"
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeCustomObjectEntry(entry.id)}>
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
  entry: CommonCustomObjectEntryFragment;
};
