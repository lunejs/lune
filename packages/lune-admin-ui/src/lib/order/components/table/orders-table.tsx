import { OrderState } from '@/lib/api/types';
import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { OrdersTableColumns } from './columns';

export const OrdersTable = ({ isRefetching, orders, totalRows, dataTable }: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;

  return (
    <DataTable
      isLoading={isRefetching}
      data={orders}
      columns={OrdersTableColumns}
      onSearch={q => updateFilters({ search: q })}
      searchDefaultValue={dataTable.filters.search}
      searchPlaceholder="Search by code or customer..."
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      filters={[
        {
          title: 'State',
          defaultSelected: dataTable.filters.states,
          options: [
            { label: 'Placed', value: OrderState.Placed },
            { label: 'Processing', value: OrderState.Processing },
            { label: 'Sent', value: OrderState.Shipped },
            { label: 'Delivered', value: OrderState.Delivered },
            { label: 'Completed', value: OrderState.Completed },
            { label: 'Canceled', value: OrderState.Canceled }
          ],
          onChange: states => dataTable.updateFilters({ states: states as OrderState[] })
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
  states: OrderState[];
};

type Props = {
  isRefetching: boolean;
  orders: OrdersTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<OrderTableFilters>;
};
