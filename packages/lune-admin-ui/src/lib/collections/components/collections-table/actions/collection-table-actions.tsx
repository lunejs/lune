import { useState } from 'react';
import { ChevronDownIcon, PencilRulerIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@lune/ui';

import type { CollectionsTableRow } from '../collections-table';

import { RemoveMassiveCollections } from './remove/remove-massive-collections';

export const CollectionTableActions = ({ rows }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <span className="hidden lg:inline">Actions</span> <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <PencilRulerIcon /> Massive edition
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setIsOpen(true)}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveMassiveCollections isOpen={isOpen} setIsOpen={setIsOpen} rows={rows} />
    </>
  );
};

type Props = {
  rows: CollectionsTableRow[];
};
