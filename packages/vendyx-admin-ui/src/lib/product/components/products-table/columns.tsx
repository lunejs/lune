import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import { getFormattedPrice } from '@vendyx/common';
import { Badge, Checkbox, cn } from '@vendyx/ui';

import { DataTableColumnHeader } from '@/lib/shared/components/data-table/data-table-column-header';

import type { TableProduct } from './products-table';

export const ProductsTableColumns: ColumnDef<TableProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <Link to={`/products/${row.original.id ?? ''}`} className="flex items-center gap-2 w-max">
        {row.original.image ? (
          <img
            src={row.original.image}
            alt={row.getValue('name')}
            className="h-12 w-12 object-cover rounded-md flex-shrink-0"
          />
        ) : (
          <>{/* <ImagePlaceholder initial={row.original.name} /> */}</>
        )}
        <span className="text-nowrap">{row.original.name}</span>
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
      return <p className="text-nowrap">{getFormattedPrice(row.original.price ?? 0)}</p>;
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
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />
  // }
];
