import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { getFormattedPrice } from '@vendyx/common';
import { Badge, Button, Checkbox, cn } from '@vendyx/ui';

import { DataTable } from '@/lib/shared/components/data-table/data-table';
import { DataTableColumnHeader } from '@/lib/shared/components/data-table/data-table-column-header';

export const ProductsTable = () => {
  return (
    <DataTable
      data={data}
      columns={columns}
      onSearch={q => console.log(q)}
      searchPlaceholder="Search products..."
      onPageChange={page => console.log(page)}
      totalRows={100}
      filters={[
        {
          title: 'Status',
          options: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' }
          ],
          onChange: values => console.log('Status filter changed:', values)
        }
      ]}
      actions={
        <>
          <Button size="sm" variant="outline" className="hidden lg:flex">
            Import
          </Button>
          <Button size="sm">
            <PlusIcon /> <span className="hidden lg:inline">Add Product</span>
          </Button>
        </>
      }
    />
  );
};

export const columns: ColumnDef<Product>[] = [
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
          {row.original.variants > 1 ? `for ${row.original.variants} variants` : ''}
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

type Product = {
  id: string;
  name: string;
  image: string;
  totalStock: number;
  price: number;
  variants: number;
  status: boolean;
};

const data: Product[] = [
  {
    id: '1',
    name: 'Jumpsuits',
    image:
      'https://plus.unsplash.com/premium_photo-1673758890539-5f38313c385c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: true,
    totalStock: 25,
    variants: 3,
    price: 25000
  },
  {
    id: '2',
    name: 'Blusa Akai',
    image:
      'https://plus.unsplash.com/premium_photo-1747873867044-fb461886f056?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: true,
    totalStock: 25,
    variants: 3,
    price: 30000
  },
  {
    id: '3',
    name: 'Blusa Creta',
    image:
      'https://plus.unsplash.com/premium_photo-1668896122554-2a4456667f65?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Qmx1c2ElMjBjcmV0YXxlbnwwfHwwfHx8MA%3D%3D',
    status: true,
    totalStock: 25,
    variants: 3,
    price: 28000
  },
  {
    id: '4',
    name: 'Overol Denim',
    image:
      'https://plus.unsplash.com/premium_photo-1695219820286-c63bcdf15485?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: true,
    totalStock: 25,
    variants: 3,
    price: 35000
  }
];
