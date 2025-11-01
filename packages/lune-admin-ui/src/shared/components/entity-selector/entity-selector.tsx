import { type ReactElement, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  P
} from '@lune/ui';

import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { SpinnerLoader } from '../loader/spinner-loader';

import { useEntitySelector } from './use-entity-selector';

export const EntitySelector = <T,>({
  trigger,
  title,
  description,
  onSearch,
  isLoading,
  renderItem,
  items,
  getRowId,
  defaultSelected,
  onDone
}: EntitySelectorProps<T>) => {
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const { selected, isSelected, onSelect } = useEntitySelector({ getRowId, defaultSelected });

  const onQueryChange = useDebouncedCallback(onSearch, TYPING_DEBOUNCE_DELAY);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="px-0 max-h-[calc(100svh-64px)]">
        <DialogHeader className="px-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 border-b">
          <div className="px-6">
            <Input placeholder="Search products..." onChange={e => onQueryChange(e.target.value)} />
          </div>

          <div className="border-t divide-y h-[calc(100svh-324px)] lg:max-h-[calc(100svh-274px)] overflow-y-scroll">
            {isLoading && (
              <div className="h-full flex items-center justify-center gap-2">
                <SpinnerLoader />
                <P className="text-muted-foreground text-center">Loading products...</P>
              </div>
            )}
            {!items.length && !isLoading && (
              <div className="h-full flex items-center justify-center">
                <P className="text-muted-foreground text-center">No results.</P>
              </div>
            )}
            {items.map(item =>
              renderItem({
                item,
                rowId: getRowId(item),
                isSelected: isSelected(item),
                onSelect: value => onSelect(value, item)
              })
            )}
          </div>
        </div>

        <DialogFooter className="px-6">
          <DialogClose asChild>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
          <Button
            isLoading={isDoneLoading}
            onClick={async () => {
              setIsDoneLoading(true);
              await onDone(selected);
              setIsDoneLoading(false);
            }}
            className="px-4!"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type EntitySelectorProps<T> = {
  trigger: ReactElement;
  title: string;
  description: string;
  onSearch: (query: string) => void;
  onDone: (selected: T[]) => void | Promise<void>;
  isLoading: boolean;
  items: T[];
  getRowId: (item: T) => string;
  renderItem: (row: EntitySelectorRow<T>) => ReactElement;
  defaultSelected: T[];
};

export type EntitySelectorRow<T> = {
  item: T;
  rowId: string;
  isSelected: boolean;
  onSelect: (value: boolean) => void;
};
