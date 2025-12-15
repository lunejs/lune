import { useParams } from 'react-router';

import { Button } from '@lune/ui';

import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { OrderCustomerCard } from '../components/details/customer/order-customer-card';
import { OrderItemsTable } from '../components/details/items/order-items-table';
import { OrderPaymentCard } from '../components/details/payment/order-payment-card';
import { useGetOrder } from '../hooks/use-get-order';

export const OrderDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, order } = useGetOrder(id);

  if (isLoading) return <PageLoader />;

  if (!order) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full">
      <DetailsPageLayout>
        <DetailsPageLayout.Header>
          <DetailsPageLayout.Title>{order.code}</DetailsPageLayout.Title>
          <DetailsPageLayout.Actions>
            <Button>Confirm</Button>
          </DetailsPageLayout.Actions>
        </DetailsPageLayout.Header>

        <DetailsPageLayout.Content>
          <div className="col-span-4 flex flex-col gap-6">
            <OrderItemsTable order={order} />
            <OrderPaymentCard payments={order.payments} />
          </div>
          <div className="col-span-2">
            <OrderCustomerCard order={order} />
          </div>
        </DetailsPageLayout.Content>
      </DetailsPageLayout>
    </PageLayout>
  );
};
