import { useParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CustomerDetails } from '../components/details/customer-details';
import { useGetCustomer } from '../hooks/use-get-customer';

export const CustomerDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, customer } = useGetCustomer(id);

  if (isLoading) return <PageLoader />;

  if (!customer) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full">
      <CustomerDetails customer={customer} />
    </PageLayout>
  );
};
