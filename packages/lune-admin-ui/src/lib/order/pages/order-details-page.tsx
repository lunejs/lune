import { useParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { OrderDetails } from '../components/details/order-details';
import { useGetOrder } from '../hooks/use-get-order';

export const OrderDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, order } = useGetOrder(id);

  if (isLoading) return <PageLoader />;

  if (!order) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full">
      <OrderDetails order={order} />
    </PageLayout>
  );
};
