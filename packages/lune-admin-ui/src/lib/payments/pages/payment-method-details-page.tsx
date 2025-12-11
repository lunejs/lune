import { useParams } from 'react-router';

import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { PaymentDetails } from '../components/details/payment-details';
import { useGetPaymentHandlers } from '../hooks/use-get-payment-handlers';
import { useGetPaymentMethod } from '../hooks/use-get-payment-method';

export const PaymentMethodDetailsPage = () => {
  const { id } = useParams() as { id: string };

  const { isLoading, paymentMethod } = useGetPaymentMethod(id);
  const { isLoading: isLoadingHandlers, paymentHandlers } = useGetPaymentHandlers();

  if (isLoading || isLoadingHandlers) return <PageLoader />;

  // TODO: add 404
  if (!paymentMethod) return <NotFound />;

  return <PaymentDetails method={paymentMethod} handlers={paymentHandlers} />;
};
