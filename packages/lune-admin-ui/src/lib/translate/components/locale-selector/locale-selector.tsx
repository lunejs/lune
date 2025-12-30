import { ChevronDownIcon, LanguagesIcon } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lunejs/ui';

export const LocaleSelector = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} disabled className="w-full sm:w-auto">
          <LanguagesIcon /> English <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>French</DropdownMenuItem>
        <DropdownMenuItem>German</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
