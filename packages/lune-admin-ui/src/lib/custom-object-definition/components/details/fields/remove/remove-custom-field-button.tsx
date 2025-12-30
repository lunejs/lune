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

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { useRemoveCustomFieldButton } from './use-remove-custom-field-button';

export const RemoveCustomFieldButton = ({ isOpen, setIsOpen, definition }: Props) => {
  const { removeCustomField } = useRemoveCustomFieldButton();

  if (!definition) return;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove field "{definition.name}"</AlertDialogTitle>
          <AlertDialogDescription>
            Field will be removed and its value from any entry to this definition . This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeCustomField(definition.id)}>
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
  definition: CommonCustomFieldDefinitionFragment | null;
};
