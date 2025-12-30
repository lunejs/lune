import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import { LunePrice } from '@lunejs/common';
import { Badge, Checkbox, P } from '@lunejs/ui';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';

import type { CustomersTableRow } from './customers-table';

export const CustomersTableColumns: ColumnDef<CustomersTableRow>[] = [
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
    accessorKey: 'customer',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const fullName =
        `${row.original.firstName ?? ''} ${row.original.lastName ?? ''}`.trim() || null;

      return (
        <Link to={`/customers/${row.original.id}`} className="flex flex-col">
          {fullName && <P className="font-medium">{fullName}</P>}
          <P className={fullName ? 'text-muted-foreground text-sm' : ''}>{row.original.email}</P>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'ordersCount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => (
      <P>
        {row.original.ordersCount} {row.original.ordersCount === 1 ? 'order' : 'orders'}
      </P>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'totalSpent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total spent" />,
    cell: ({ row }) => <P>{LunePrice.format(row.original.totalSpent)}</P>,
    enableSorting: false
  },
  {
    accessorKey: 'enabled',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={row.original.enabled ? 'default' : 'outline'}>
        {row.original.enabled ? 'Enabled' : 'Disabled'}
      </Badge>
    ),
    enableSorting: false
  }
];
