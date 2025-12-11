import { PageLayout } from '@/shared/components/layout/page-layout';

import { OrdersTable } from '../components/table/orders-table';

export const OrdersPage = () => {
  return (
    <PageLayout>
      <OrdersTable />
    </PageLayout>
  );
};
