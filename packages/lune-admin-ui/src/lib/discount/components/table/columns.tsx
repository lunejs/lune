import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import { Checkbox } from '@lune/ui';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';

import type { DiscountsTableRow } from './discounts-table';

export const DiscountsTableColumns: ColumnDef<DiscountsTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <Link to={`/discounts/${row.original.id ?? ''}`} className="flex items-center gap-2 w-max">
        {row.original.image ? (
          <img
            src={row.original.image}
            alt={row.getValue('name')}
            className="h-12 w-12 object-cover rounded-md flex-shrink-0"
          />
        ) : (
          <>
            <ImagePlaceholder initial={row.original.name} className="flex-shrink-0" />
          </>
        )}
        <span className="">{row.original.name}</span>
      </Link>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'totalStock',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Stock" />;
    },
    cell: ({ row }) => {
      return (
        <p className="text-nowrap">
          <span className={cn(row.original.totalStock < 10 && 'text-destructive')}>
            {row.original.totalStock} in stock
          </span>{' '}
          {row.original.totalVariants > 1 ? `for ${row.original.totalVariants} variants` : ''}
        </p>
      );
    },
    enableSorting: false
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Price" />;
    },
    cell: ({ row }) => {
      return <p className="text-nowrap">{LunePrice.format(row.original.price ?? 0)}</p>;
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
