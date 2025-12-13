import { useParams } from 'react-router';

import { Button } from '@lune/ui';

import { DetailsPageLayout } from '@/shared/components/layout/details-page-layout';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { useGetOrder } from '../hooks/use-get-order';

export const OrderDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, order } = useGetOrder(id);

  if (isLoading) return <PageLoader />;

  if (!order) return <NotFound />;

  return (
    <PageLayout>
      <DetailsPageLayout>
        <DetailsPageLayout.Header>
          <DetailsPageLayout.Title>Create discount</DetailsPageLayout.Title>
          <DetailsPageLayout.Actions>
            <Button>Confirm</Button>
          </DetailsPageLayout.Actions>
        </DetailsPageLayout.Header>

        <DetailsPageLayout.Content>
          <h1>{order.code}</h1>
        </DetailsPageLayout.Content>
      </DetailsPageLayout>
    </PageLayout>
  );
};
