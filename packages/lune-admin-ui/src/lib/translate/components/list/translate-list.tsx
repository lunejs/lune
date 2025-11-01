import { type ReactElement, useState } from 'react';
import { ListFilterIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  InputGroup
} from '@lune/ui';

import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

// TODO: Refactor to be a composable component
export const TranslateList = <T,>({
  isLoading,
  filters,
  renderItem,
  items,
  onSearch,
  onFilterChange,
  className
}: Props<T>) => {
  const [activeFilters, setActiveFilters] = useState<string[]>(
    filters.some(f => f.defaultChecked)
      ? [filters.find(f => f.defaultChecked)?.value as string]
      : []
  );

  const OnQueryChange = useDebouncedCallback(onSearch, TYPING_DEBOUNCE_DELAY);

  return (
    <aside className={cn('flex w-80 divide-y h-full flex-col shrink-0', className?.root)}>
      <header className="flex items-center gap-3 p-4">
        <InputGroup placeholder="Search..." onChange={e => OnQueryChange(e.target.value)} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <ListFilterIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {filters.map(filter => (
              <DropdownMenuCheckboxItem
                checked={activeFilters.some(activeFilter => activeFilter === filter.value)}
                onCheckedChange={value => {
                  if (value) {
                    const newActiveFilters = filter.combinable
                      ? [...activeFilters, filter.value]
                      : [filter.value];

                    setActiveFilters(newActiveFilters);
                    onFilterChange(newActiveFilters);
                    return;
                  }

                  const newActiveFilters = activeFilters.filter(
                    activeFilter => activeFilter !== filter.value
                  );

                  setActiveFilters(newActiveFilters);
                  onFilterChange(newActiveFilters);
                }}
              >
                {filter.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className={cn('flex flex-col gap-4 px-4 py-4', className?.list)}>
        {isLoading && (
          <div className="w-full flex justify-center pt-6">
            <SpinnerLoader />
          </div>
        )}
        {items.map(item => renderItem(item))}
        {/* {products?.map(product => {
          const isSelected = product.id === id;

          return (
            <TranslateListItem
              key={product.id}
              href={`/translate/products/${product.id}`}
              isSelected={isSelected}
              title={product.name}
              image={product.assets.items[0]?.source}
            />
          );
        })} */}
      </div>
    </aside>
  );
};

type Props<T> = {
  isLoading: boolean;
  items: T[];
  renderItem: (item: T) => ReactElement;
  filters: { label: string; value: string; combinable: boolean; defaultChecked?: boolean }[];
  onSearch: (q: string) => void;
  onFilterChange: (activeFilters: string[]) => void;
  className?: {
    root?: string;
    list?: string;
  };
};
