'use client';

import * as React from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { LoaderIcon } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@lune/ui';

import { TableContextProvider } from './data-table-context';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, data, totalRows, defaultPagination, isLoading } = props;

  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: defaultPagination?.page ? defaultPagination.page - 1 : 0,
    pageSize: defaultPagination?.pageSize || 10
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,
    manualPagination: true,
    rowCount: totalRows,
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      pagination
    }
  });

  return (
    <TableContextProvider table={table}>
      <div className="flex flex-col gap-4 h-full">
        <DataTableToolbar {...props} table={table} />
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="bg-muted/50">
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24">
                    <div className="w-full flex justify-center">
                      <LoaderIcon className="text-muted-foreground animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {table.getRowModel().rows?.length && !isLoading
                ? table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : !isLoading && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} {...props} />
      </div>
    </TableContextProvider>
  );
}

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSearch: (query: string) => void;
  searchPlaceholder?: string;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isLoading: boolean;
  defaultPagination?: { page?: number; pageSize?: number };
  actions?: React.ReactNode;
  filters?: DataTableFilter[];
  onSelectRender?: (rows: TData[]) => React.ReactElement;
};

export type DataTableFilter = {
  title: string;
  options: { label: string; value: string }[];
  onChange: (values: string[]) => void;
};
