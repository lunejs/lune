import type { Table } from '@tanstack/react-table';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@lune/ui';

import { SpinnerLoader } from '../loader/spinner-loader';

import { type DataTableProps } from './data-table';
import { DataTableFilter } from './data-table-filter';

export function DataTableToolbar<TData, TValue>({
  onSearch,
  searchPlaceholder,
  actions,
  filters,
  table,
  isLoading,
  onSelectRender,
  searchDefaultValue
}: Props<TData, TValue>) {
  const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        {onSearch && (
          <InputGroup className="w-[150px] lg:w-[250px]">
            <InputGroupInput
              defaultValue={searchDefaultValue}
              placeholder={searchPlaceholder || 'Search...'}
              onChange={event => onSearch(event.target.value)}
              className="text-sm h-8"
            />
            {isLoading && (
              <InputGroupAddon className="quick-fade-in" align={'inline-end'}>
                <SpinnerLoader />
              </InputGroupAddon>
            )}
          </InputGroup>
        )}

        <div className="hidden lg:block">
          {filters?.map(filter => (
            <DataTableFilter key={filter.title} filter={filter} table={table} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <DataTableViewOptions table={table} /> */}
        {!!selectedRows.length && onSelectRender?.(selectedRows)}
        {actions}
      </div>
    </div>
  );
}

type Props<TData, TValue> = DataTableProps<TData, TValue> & {
  table: Table<TData>;
};
