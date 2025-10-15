import { useState } from 'react';
import { ArchiveIcon, ChevronDownIcon, LanguagesIcon, Trash2Icon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@vendyx/ui';

import type { CommonProductFragment } from '@/lib/api/types';

import { ArchiveProduct } from './archive/archive-product';
import { RemoveProduct } from './remove/remove-product';

export const ProductActions = ({ product }: Props) => {
  const [isRemoveProductOpen, setRemoveProductOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="hidden lg:inline">Actions</span> <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <LanguagesIcon /> Translate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsArchiveOpen(true)}>
            <ArchiveIcon /> Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={() => setRemoveProductOpen(true)}
          >
            <Trash2Icon className="text-destructive" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveProduct
        isOpen={isRemoveProductOpen}
        setIsOpen={setRemoveProductOpen}
        product={product}
      />
      <ArchiveProduct isOpen={isArchiveOpen} setIsOpen={setIsArchiveOpen} product={product} />
    </>
  );
};

type Props = {
  product: CommonProductFragment;
};
