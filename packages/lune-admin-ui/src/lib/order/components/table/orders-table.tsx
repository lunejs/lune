import { type OrderState } from '@/lib/api/types';
import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { OrdersTableColumns } from './columns';

export const OrdersTable = ({
  isRefetching,
  orders,
  totalRows,
  dataTable,
  onStateFilterChange
}: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;

  return (
    <DataTable
      isLoading={isRefetching}
      data={orders}
      columns={OrdersTableColumns}
      onSearch={q => updateFilters({ search: q })}
      searchPlaceholder="Search by code or customer..."
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      filters={[
        {
          title: 'State',
          options: [
            { label: 'Placed', value: 'PLACED' },
            { label: 'Processing', value: 'PROCESSING' },
            { label: 'Shipped', value: 'SHIPPED' },
            { label: 'Delivered', value: 'DELIVERED' },
            { label: 'Completed', value: 'COMPLETED' },
            { label: 'Canceled', value: 'CANCELED' }
          ],
          onChange: onStateFilterChange
        }
      ]}
    />
  );
};

export type OrdersTableRow = {
  id: string;
  code: string | null;
  customer: string | null;
  total: number;
  items: number;
  state: OrderState;
  fulfillment: 'Shipping' | 'Pickup' | null;
  placedAt: string | null;
};

type OrderTableFilters = {
  search: string;
  state: OrderState | undefined;
};

type Props = {
  isRefetching: boolean;
  orders: OrdersTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<OrderTableFilters>;
  onStateFilterChange: (values: string[]) => void;
};
