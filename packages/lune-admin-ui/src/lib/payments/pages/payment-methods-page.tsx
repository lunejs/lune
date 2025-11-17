import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { PaymentMethodsTable } from '../components/payment-methods-table/payment-methods-table';
import { useGetPaymentMethods } from '../hooks/use-get-payment-methods';

export const PaymentMethodsPage = () => {
  const { isLoading, paymentMethods } = useGetPaymentMethods();

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout title="Payments" subtitle="Manage your payment methods">
      <PaymentMethodsTable paymentMethods={paymentMethods} />
    </SettingsPageLayout>
  );
};
