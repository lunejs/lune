import { PageLayout } from '@/shared/components/layout/page-layout';

import { OrdersTableEmptyState } from '../components/table/empty-state';
import { OrdersTable } from '../components/table/orders-table';
import { useOrdersTable } from '../components/table/use-orders-table';

export const OrdersPage = () => {
  const result = useOrdersTable();

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? <OrdersTableEmptyState /> : <OrdersTable {...result} />}
    </PageLayout>
  );
};
