import { useState } from 'react';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';

import type { DiscountsTableRow } from '../discounts-table';

import { RemoveDiscounts } from './remove/remove-discounts';

export const DiscountsTableActions = ({ rows }: Props) => {
  const [isRemoveDiscountOpen, setRemoveDiscountOpen] = useState(false);

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
            onClick={() => setRemoveDiscountOpen(true)}
          >
            <Trash2Icon className="text-destructive" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveDiscounts
        isOpen={isRemoveDiscountOpen}
        setIsOpen={setRemoveDiscountOpen}
        rows={rows}
      />
    </>
  );
};

type Props = {
  rows: DiscountsTableRow[];
};
