import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';
import { ChevronDownIcon } from 'lucide-react';

import type { AssetsTableRow } from '../assets-table';

import { RemoveMassiveAssets } from './remove/remove-massive-assets';

export const AssetsTableActions = ({ rows }: Props) => {
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
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setIsOpen(true)}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveMassiveAssets isOpen={isOpen} setIsOpen={setIsOpen} rows={rows} />
    </>
  );
};

type Props = {
  rows: AssetsTableRow[];
};
