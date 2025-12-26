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

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';

import { useRemoveCustomObjectDefinitionAlert } from './use-remove-discount-button';

export const RemoveCustomObjectDefinitionAlert = ({ isOpen, setIsOpen, definition }: Props) => {
  const { removeCustomObjectDefinition } = useRemoveCustomObjectDefinitionAlert();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove "{definition.name}"</AlertDialogTitle>
          <AlertDialogDescription>
            By removing this custom object, All entries related to this object will be deleted too.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeCustomObjectDefinition(definition.id)}>
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
  definition: CommonCustomObjectDefinitionFragment;
};
