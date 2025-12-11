import type { ColumnDef } from '@tanstack/react-table';
import { UserIcon } from 'lucide-react';
import { Link } from 'react-router';

import { formatDate, LunePrice } from '@lune/common';
import { Badge, Checkbox, P } from '@lune/ui';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';

import type { OrdersTableRow } from './orders-table';

const getStateBadgeVariant = (state: string) => {
  switch (state) {
    case 'PLACED':
      return 'default';
    case 'PROCESSING':
      return 'secondary';
    case 'SHIPPED':
      return 'outline';
    case 'DELIVERED':
    case 'COMPLETED':
      return 'default';
    case 'CANCELED':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const formatState = (state: string) => {
  return state.charAt(0) + state.slice(1).toLowerCase();
};

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
    cell: ({ row }) => <P className="w-20 font-mono">{row.original.code ?? '-'}</P>,
    enableSorting: false
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => (
      <Link to={`/orders/${row.original.id}`} className="flex items-center gap-2 w-max">
        <UserIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
        <P className="text-nowrap">{row.original.customer ?? 'Guest'}</P>
      </Link>
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
    cell: ({ row }) => (
      <Badge variant={getStateBadgeVariant(row.original.state)}>
        {formatState(row.original.state)}
      </Badge>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'shipment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shipment" />,
    cell: ({ row }) => <P>{row.original.shipment ?? '-'}</P>,
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
