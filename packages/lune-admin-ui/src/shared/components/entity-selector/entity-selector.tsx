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

/**
 * EntitySelector
 *
 * @description
 *
 * A generic and reusable dialog component for selecting multiple entities from a searchable list.
 * Supports any type of entity (products, collections, countries, etc.) with customizable rendering.
 *
 * @example
 * // Basic usage with products
 * <EntitySelector
 *   trigger={<Button>Add products</Button>}
 *   title="Add products"
 *   description="Select products to add to your collection"
 *
 *   items={products}
 *   isLoading={isLoading}
 *   defaultSelected={[]}
 *
 *   getRowId={(product) => product.id}
 *   onSearch={(query) => setSearchQuery(query)}
 *
 *   renderItem={({ item, isSelected, onSelect }) => (
 *     <DefaultEntitySelectorRow
 *       title={item.name}
 *       image={item.assets.items[0]?.source}
 *       isSelected={isSelected}
 *       onSelect={onSelect}
 *     />
 *   )}
 *
 *   onDone={async (selectedProducts) => {
 *     await addProductsToCollection(selectedProducts);
 *     notification.success('Products added');
 *     return true; // Closes dialog
 *   }}
 * />
 */
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
  const [isOpen, setIsOpen] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  const { selected, isSelected, onSelect, resetSelection } = useEntitySelector({
    getRowId,
    defaultSelected
  });

  const onQueryChange = useDebouncedCallback(onSearch, TYPING_DEBOUNCE_DELAY);

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={open => {
        if (open) resetSelection();
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="px-0 max-h-[calc(100svh-64px)]">
        <DialogHeader className="px-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 border-b">
          <div className="px-6">
            <Input placeholder="Search..." onChange={e => onQueryChange(e.target.value)} />
          </div>

          <div className="border-t divide-y max-h-[calc(100svh-324px)] lg:max-h-[calc(100svh-274px)] overflow-y-auto">
            {isLoading && (
              <div className="h-full flex items-center justify-center gap-2">
                <SpinnerLoader />
                <P className="text-muted-foreground text-center">Loading...</P>
              </div>
            )}

            {!items.length && !isLoading && (
              <div className="h-full flex items-center justify-center py-48">
                <P className="text-muted-foreground text-center">No results.</P>
              </div>
            )}

            {items.map(item =>
              renderItem({
                item,
                rowId: getRowId(item),
                isSelected: isSelected(item),
                onSelect: value => onSelect(value, item),
                selected
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
              const isSuccess = await onDone(selected);

              setIsDoneLoading(false);

              if (isSuccess) setIsOpen(false);
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
  /** Dialog title */
  title: string;
  /** Dialog description/subtitle */
  description: string;
  /**
   * @description
   *
   * Trigger element that opens the dialog (usually a Button).
   * Must be a valid ReactElement.
   */
  trigger: ReactElement;

  /**
   * @description
   *
   * Loading state for fetching items
   */
  isLoading: boolean;
  /**
   * @description
   *
   * Array of items to display in the selector
   */
  items: T[];
  /**
   * @description
   *
   * Search handler called when user types in search input.
   * Debounced automatically with 300ms delay.
   */
  onSearch: (query: string) => void;
  /**
   * @description
   *
   * Submit handler called when user clicks "Done" button.
   * Receives array of selected items.
   * Return `true` to close dialog, `false` to keep it open (useful for error handling).
   */
  onDone: (selected: T[]) => boolean | Promise<boolean>;
  /**
   * @description
   *
   * Function to extract unique ID from each item. Used for selection tracking
   */
  getRowId: (item: T) => string;
  /**
   * @description
   *
   * Render function for each item row.
   */
  renderItem: (row: EntitySelectorRow<T>) => ReactElement;
  /**
   * @description
   * Items that should be pre-selected when dialog opens.
   * Useful for editing existing selections.
   */
  defaultSelected: T[];
};

export type EntitySelectorRow<T> = {
  /**
   * @description
   *
   * The item being rendered
   */
  item: T;
  /**
   * @description
   *
   * Unique ID of the item (from getRowId)
   */
  rowId: string;
  /**
   * @description
   *
   * Whether this item is currently selected
   */
  isSelected: boolean;
  /**
   * @description
   *
   * Handler to toggle selection state
   */
  onSelect: (value: boolean) => void;
  /**
   * @description
   *
   * All selection state
   */
  selected: T[];
};
