import type { Table } from '@tanstack/react-table';

import { Input } from '@vendyx/ui';

import { type DataTableProps } from './data-table';
import { DataTableFilter } from './data-table-filter';

export function DataTableToolbar<TData, TValue>({
  onSearch,
  searchPlaceholder,
  actions,
  filters,
  table
}: Props<TData, TValue>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={searchPlaceholder || 'Search...'}
          onChange={event => onSearch(event.target.value)}
          className="text-sm h-8 w-[150px] lg:w-[250px]"
        />

        <div className="hidden lg:block">
          {filters?.map(filter => (
            <DataTableFilter key={filter.title} filter={filter} table={table} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <DataTableViewOptions table={table} /> */}
        {actions}
      </div>
    </div>
  );
}

type Props<TData, TValue> = DataTableProps<TData, TValue> & {
  table: Table<TData>;
};
