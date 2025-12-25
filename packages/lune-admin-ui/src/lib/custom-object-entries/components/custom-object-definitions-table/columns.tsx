import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import { Checkbox } from '@lune/ui';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';

import type { CustomObjectDefinitionsTableRow } from './custom-object-definitions-table';

export const CustomObjectDefinitionsTableColumns: ColumnDef<CustomObjectDefinitionsTableRow>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      return (
        <Link to={`/custom-objects/${row.original.id}`} className="text-nowrap hover:underline">
          {row.original.name}
        </Link>
      );
    },
    enableSorting: false
  },
  {
    accessorKey: 'key',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Key" />,
    cell: ({ row }) => {
      return <p className="text-nowrap text-muted-foreground">{row.original.key}</p>;
    },
    enableSorting: false
  },
  {
    accessorKey: 'totalFields',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fields" />,
    cell: ({ row }) => {
      return <p className="text-nowrap">{row.original.totalFields}</p>;
    },
    enableSorting: false
  }
];
