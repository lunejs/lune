import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import { formatDate } from '@lune/common';
import { Checkbox } from '@lune/ui';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';

import type { CustomObjectEntriesTableRow } from './custom-object-entries-table';

export const CustomObjectEntriesTableColumns: ColumnDef<CustomObjectEntriesTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Entry" />,
    cell: ({ row }) => {
      return (
        <Link
          to={`/custom-objects/${row.original.definitionId}/${row.original.id}`}
          className="text-nowrap hover:underline"
        >
          {row.original.title}
        </Link>
      );
    },
    enableSorting: false
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <p className="text-nowrap text-muted-foreground">
        {formatDate(new Date(row.original.createdAt))}
      </p>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
    cell: ({ row }) => (
      <p className="text-nowrap text-muted-foreground">
        {formatDate(new Date(row.original.updatedAt))}
      </p>
    ),
    enableSorting: false
  }
];
