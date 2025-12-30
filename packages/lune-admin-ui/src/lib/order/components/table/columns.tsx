import { formatDate, LunePrice } from '@lunejs/common';
import { Checkbox, P } from '@lunejs/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { StoreIcon, TruckIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';

import { OrderStateBadge } from '../status/order-state-badge';

import type { OrdersTableRow } from './orders-table';

export const OrdersTableColumns: ColumnDef<OrdersTableRow>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    cell: ({ row }) => (
      <Link to={`/orders/${row.original.id}`} className="flex items-center gap-2 w-max">
        <P className="w-20 font-mono">{row.original.code ?? '-'}</P>
      </Link>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 w-max">
        <UserIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
        <P className="text-nowrap">{row.original.customer ?? 'Guest'}</P>
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'total',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <P className="font-medium">{LunePrice.format(row.original.total)}</P>,
    enableSorting: false
  },
  {
    accessorKey: 'items',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Products" />,
    cell: ({ row }) => (
      <P>
        {row.original.items} {row.original.items === 1 ? 'item' : 'items'}
      </P>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'state',
    header: ({ column }) => <DataTableColumnHeader column={column} title="State" />,
    cell: ({ row }) => <OrderStateBadge state={row.original.state} />,
    enableSorting: false
  },
  {
    accessorKey: 'fulfillment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.original.deliveryMethod === 'Pickup' ? (
          <StoreIcon size={16} />
        ) : (
          <TruckIcon size={16} />
        )}
        <P>{row.original.deliveryMethod ?? '-'}</P>
      </div>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'placedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Placed at" />,
    cell: ({ row }) => (
      <P className="text-nowrap">
        {row.original.placedAt ? formatDate(new Date(row.original.placedAt)) : '-'}
      </P>
    ),
    enableSorting: false
  }
];
