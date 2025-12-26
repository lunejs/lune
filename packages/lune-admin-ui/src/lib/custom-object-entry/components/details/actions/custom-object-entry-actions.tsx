import { useState } from 'react';
import { ChevronDownIcon, LanguagesIcon, Trash2Icon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@lune/ui';

import type {
  CommonCustomObjectDefinitionFragment,
  CommonCustomObjectEntryFragment
} from '@/lib/api/types';
import { useBack } from '@/shared/hooks/use-back';

import { RemoveCustomObjectEntryAlert } from './remove/remove-custom-object-entry-alert';

export const CustomObjectEntryActions = ({ definition, entry }: Props) => {
  const { goto } = useBack();

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
            onClick={() => goto(`/translate/custom-objects/${definition.id}/${entry.id}`)}
          >
            <LanguagesIcon /> Translate
          </DropdownMenuItem>

          <DropdownMenuSeparator />

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
  definition: CommonCustomObjectDefinitionFragment;
  entry: CommonCustomObjectEntryFragment;
};
