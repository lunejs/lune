import { useState } from 'react';
import { ChevronDownIcon, PencilRulerIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@vendyx/ui';

import type { TableProduct } from '../products-table';

import { RemoveProducts } from './remove/remove-products';

export const ProductTableActions = ({ rows }: Props) => {
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
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setIsOpen(true)}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveProducts isOpen={isOpen} setIsOpen={setIsOpen} products={rows} />
    </>
  );
};

type Props = {
  rows: TableProduct[];
};
