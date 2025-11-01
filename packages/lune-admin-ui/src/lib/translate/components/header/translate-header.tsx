import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  H4,
  Small
} from '@lune/ui';

import { useBack } from '@/shared/hooks/use-back';

export const TranslateHeader = ({ entitySelectorTitle }: Props) => {
  const { back } = useBack();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-center p-4 lg:justify-between">
        <button
          onClick={back}
          className="absolute left-8 lg:relative lg:left-auto group flex h-fit items-center w-fit gap-3 p-1 cursor-pointer transition-colors"
        >
          <LogOutIcon size={16} className="rotate-180" />{' '}
          <Small className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            Quit
          </Small>
        </button>
        <H4>Translate</H4>
        <div className="hidden lg:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                {entitySelectorTitle} <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={'/translate/products'}>
                <DropdownMenuItem>Products</DropdownMenuItem>
              </Link>
              <Link to={'/translate/collections'}>
                <DropdownMenuItem>Collections</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

type Props = {
  entitySelectorTitle: string;
};
