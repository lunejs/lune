import { EllipsisIcon, LucideClipboardEdit, LucideMapPinHouse } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lune/ui';

export const CustomerInfoActions = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'} className="">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <LucideClipboardEdit /> Edit contact information
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideMapPinHouse />
            Manage addresses
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
