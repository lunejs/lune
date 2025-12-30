import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';
import { EllipsisIcon, LucideClipboardEdit, LucideMapPinHouse } from 'lucide-react';

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
