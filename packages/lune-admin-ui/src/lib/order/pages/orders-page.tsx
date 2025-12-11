import { PageLayout } from '@/shared/components/layout/page-layout';

import { OrdersTable } from '../components/table/orders-table';
import { OrdersTableEmptyState } from '../components/table/empty-state';
import { useOrdersTable } from '../components/table/use-orders-table';

export const OrdersPage = () => {
  const result = useOrdersTable();

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? <OrdersTableEmptyState /> : <OrdersTable {...result} />}
    </PageLayout>
  );
};
