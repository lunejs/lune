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

import type { CommonCollectionFragment } from '@/lib/api/types';
import { useBack } from '@/shared/hooks/use-back';

import { RemoveCollection } from './remove/remove-collection';

export const CollectionActions = ({ collection }: Props) => {
  const { goto } = useBack();

  const [isRemoveCollectionOpen, setRemoveCollectionOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="hidden lg:inline">Actions</span> <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => goto(`/translate/collections/${collection.id}`)}>
            <LanguagesIcon /> Translate
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setRemoveCollectionOpen(true)}
          >
            <Trash2Icon className="text-destructive" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveCollection
        isOpen={isRemoveCollectionOpen}
        setIsOpen={setRemoveCollectionOpen}
        collection={collection}
      />
    </>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
