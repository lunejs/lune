import { PageLoader } from '@/shared/components/loader/page-loader';

import { PaymentDetails } from '../components/details/payment-details';
import { useGetPaymentHandlers } from '../hooks/use-get-payment-handlers';

export const NewPaymentMethodPage = () => {
  const { isLoading, paymentHandlers } = useGetPaymentHandlers();

  if (isLoading) return <PageLoader />;

  return <PaymentDetails handlers={paymentHandlers} />;
};
