import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';

import type { CommonZoneFragment } from '@/lib/api/types';

import { RemoveZoneDialog } from './remove/remove-zone-dialog';

export const ZoneActions = ({ zone }: Props) => {
  const [isRemoveZoneOpen, setRemoveZoneOpen] = useState(false);

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
            onClick={() => setRemoveZoneOpen(true)}
          >
            <Trash2Icon className="text-destructive" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveZoneDialog isOpen={isRemoveZoneOpen} setIsOpen={setRemoveZoneOpen} zone={zone} />
    </>
  );
};

type Props = {
  zone: CommonZoneFragment;
};
