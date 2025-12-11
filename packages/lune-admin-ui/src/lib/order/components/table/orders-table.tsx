import { DataTable } from '@/shared/components/data-table/data-table';

import { OrdersTableColumns } from './columns';
import { OrdersTableEmptyState } from './empty-state';
import { useOrdersTable } from './use-orders-table';

export const OrdersTable = () => {
  const { isLoading, isRefetching, shouldRenderEmptyState, orders, pagination, onUpdate } =
    useOrdersTable();

  if (shouldRenderEmptyState) return <OrdersTableEmptyState />;

  return (
    <DataTable
      isLoading={isLoading || isRefetching}
      data={orders}
      columns={OrdersTableColumns}
      onSearch={async q => onUpdate({ search: q })}
      searchPlaceholder="Search by code or customer..."
      onPageChange={page => onUpdate({ page })}
      onPageSizeChange={size => onUpdate({ size })}
      totalRows={pagination.pageInfo?.total ?? 0}
      defaultPagination={{ page: 1, pageSize: 10 }}
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
          onChange: state => onUpdate({ state })
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
  state: string;
  shipment: string | null;
  placedAt: string | null;
};
