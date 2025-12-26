import { useState } from 'react';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lune/ui';

import type { CommonCustomObjectEntryFragment } from '@/lib/api/types';

import { RemoveCustomObjectEntryAlert } from './remove/remove-custom-object-entry-alert';

export const CustomObjectEntryActions = ({ entry }: Props) => {
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
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setIsRemoveOpen(true)}
          >
            <Trash2Icon className="text-destructive" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveCustomObjectEntryAlert
        isOpen={isRemoveOpen}
        setIsOpen={setIsRemoveOpen}
        entry={entry}
      />
    </>
  );
};

type Props = {
  entry: CommonCustomObjectEntryFragment;
};
