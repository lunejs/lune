import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import { Badge, Checkbox } from '@vendyx/ui';

import { CollectionContentType } from '@/lib/api/types';
import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import type { CollectionsTableRow } from './collections-table';

export const CollectionsTableColumns: ColumnDef<CollectionsTableRow>[] = [
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
      return <DataTableColumnHeader column={column} title="Collections" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          to={`/collections/${row.original.id ?? ''}`}
          className="flex items-center gap-2 w-max"
        >
          {row.original.image ? (
            <img
              src={row.original.image}
              alt={row.getValue('name')}
              className="h-12 w-12 object-cover rounded-md flex-shrink-0"
            />
          ) : (
            <ImagePlaceholder initial={row.original.name} />
          )}
          <span className="text-nowrap">{row.original.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'totalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
    cell: ({ row }) => {
      return <p className="text-nowrap">{row.original.totalContent}</p>;
    }
  },
  {
    accessorKey: 'contentType',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Content" />;
    },
    cell: ({ row }) => {
      const contentType =
        row.original.contentType === CollectionContentType.Products ? 'Products' : 'Collections';

      return <p className="text-nowrap">{contentType}</p>;
    },
    enableSorting: false
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status ? 'default' : 'secondary'}>
          {row.original.status ? 'Enabled' : 'Disabled'}
        </Badge>
      );
    },
    enableSorting: false
  }
];
