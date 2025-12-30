import { filesize, formatDate } from '@lunejs/common';
import { Checkbox, P, Small } from '@lunejs/ui';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import { AssetDetails } from '../details/asset-details';

import type { AssetsTableRow } from './assets-table';

export const AssetsTableColumns: ColumnDef<AssetsTableRow>[] = [
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
    accessorKey: 'filename',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Asset" />,
    cell: ({ row }) => (
      <AssetDetails asset={row.original}>
        <button className="flex items-center gap-2 w-max cursor-pointer">
          {row.original.source ? (
            <img
              src={row.original.source}
              alt={row.original.filename}
              className="h-12 w-12 object-cover rounded-md shrink-0"
            />
          ) : (
            <>
              <ImagePlaceholder initial={row.original.filename} className="shrink-0" />
            </>
          )}
          <div className="flex flex-col items-start">
            <P className="text-nowrap">{row.original.filename}</P>
            <Small className="text-nowrap text-muted-foreground">
              {row.original.ext.toUpperCase()}
            </Small>
          </div>
        </button>
      </AssetDetails>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      return <P className="text-nowrap">{formatDate(row.original.createdAt)}</P>;
    },
    enableSorting: false
  },
  {
    accessorKey: 'size',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Size" />;
    },
    cell: ({ row }) => {
      return <P>{filesize(row.original.size)}</P>;
    },
    enableSorting: false
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />
  // }
];
