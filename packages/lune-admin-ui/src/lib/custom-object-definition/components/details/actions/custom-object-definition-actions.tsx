import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';
import { ChevronDownIcon, FilePenIcon, FileTextIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';

import { RemoveCustomObjectDefinitionAlert } from './remove/remove-custom-object-definition';

export const CustomObjectDefinitionActions = ({ definition }: Props) => {
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="hidden lg:inline">Actions</span> <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to={`/custom-objects/${definition.id}/new`}>
              <FilePenIcon /> Add entry
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/custom-objects/${definition.id}`}>
              <FileTextIcon /> View entries
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setIsRemoveOpen(true)}
          >
            <Trash2Icon className="text-destructive" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveCustomObjectDefinitionAlert
        isOpen={isRemoveOpen}
        setIsOpen={setIsRemoveOpen}
        definition={definition}
      />
    </>
  );
};

type Props = {
  definition: CommonCustomObjectDefinitionFragment;
};
