import type { ColumnDef } from '@tanstack/react-table';
import { PackageIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Badge, Checkbox, P } from '@lunejs/ui';

import { DiscountApplicationLevel, DiscountApplicationMode } from '@/lib/api/types';
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
    cell: ({ row }) => (
      <Link to={`/discounts/${row.original.id ?? ''}`} className="flex items-center gap-2 w-max">
        <span className="">{row.original.code}</span>
      </Link>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'applicationMode',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Method" />,
    cell: ({ row }) => {
      const isAutomatic = row.original.applicationMode === DiscountApplicationMode.Automatic;
      return <P>{isAutomatic ? 'Automatic' : 'Code'}</P>;
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'applicationLevel',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const isOrderLevel = row.original.applicationLevel === DiscountApplicationLevel.Order;
      const isOrderLineLevel = row.original.applicationLevel === DiscountApplicationLevel.OrderLine;

      const text = isOrderLevel ? 'Order' : isOrderLineLevel ? 'Product' : 'Shipment';
      const Icon = isOrderLevel ? (
        <ShoppingCartIcon size={16} />
      ) : isOrderLineLevel ? (
        <PackageIcon size={16} />
      ) : (
        <TruckIcon size={16} />
      );

      return (
        <div className="flex items-center gap-2">
          {Icon}
          <P>{text}</P>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.enabled ? 'default' : 'secondary'}>
          {row.original.enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      );
    },
    enableSorting: false
  }
];
