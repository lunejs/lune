import { useState } from 'react';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lune/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';

import { RemoveCustomFieldButton } from './remove/remove-custom-field-button';

export const CustomFieldActions = ({ entity, definition }: Props) => {
  const [dialogOpen, setDialogOpen] = useState<DefinitionDialog | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="hidden lg:inline">Actions</span> <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogOpen(DefinitionDialog.Remove)}>
            <Trash2Icon className="text-destructive" />{' '}
            <span className="text-destructive">Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveCustomFieldButton
        isOpen={dialogOpen === DefinitionDialog.Remove}
        setIsOpen={value => setDialogOpen(value ? DefinitionDialog.Remove : null)}
        definition={definition}
        entity={entity}
      />
    </>
  );
};

enum DefinitionDialog {
  Remove
}

type Props = {
  definition: CommonCustomFieldDefinitionFragment;
  entity: CustomFieldAppliesToEntity;
};
