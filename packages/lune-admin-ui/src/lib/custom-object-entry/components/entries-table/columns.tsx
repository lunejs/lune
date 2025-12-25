import type { ColumnDef } from '@tanstack/react-table';
import { Link, useParams } from 'react-router';

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
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
    cell: ({ row }) => <SlugCell row={row.original} />,
    enableSorting: false
  },
  {
    accessorKey: 'valuesCount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Values" />,
    cell: ({ row }) => <p className="text-nowrap">{row.original.valuesCount}</p>,
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

const SlugCell = ({ row }: { row: CustomObjectEntriesTableRow }) => {
  const { id: definitionId } = useParams<{ id: string }>();

  return (
    <Link
      to={`/custom-objects/${definitionId}/entries/${row.id}`}
      className="text-nowrap hover:underline"
    >
      {row.slug}
    </Link>
  );
};
