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
} from '@lunejs/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';

import { useRemoveCustomFieldButton } from './use-remove-custom-field-button';

export const RemoveCustomFieldButton = ({ isOpen, setIsOpen, definition, entity }: Props) => {
  const { removeCustomField } = useRemoveCustomFieldButton(entity);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>Remove</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove product "{definition.name}"</AlertDialogTitle>
          <AlertDialogDescription>
            Custom field will be removed from any product in which it is being used. This action
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
  definition: CommonCustomFieldDefinitionFragment;
  entity: CustomFieldAppliesToEntity;
};
