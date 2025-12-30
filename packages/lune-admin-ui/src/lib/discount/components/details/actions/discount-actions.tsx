import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';

import type { CommonDiscountFragment } from '@/lib/api/types';

import { RemoveDiscount } from './remove/remove-discount';

export const DiscountActions = ({ discount }: Props) => {
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
      <RemoveDiscount
        isOpen={isRemoveDiscountOpen}
        setIsOpen={setRemoveDiscountOpen}
        discount={discount}
      />
    </>
  );
};

type Props = {
  discount: CommonDiscountFragment;
};
