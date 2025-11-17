import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { InStorePickupLocations } from '../components/in-store-pickup/in-store-pickup-locations';
import { useGetLocations } from '../hooks/use-get-locations';

export const InStorePickupLocationsPage = () => {
  const { isLoading, locations } = useGetLocations();

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout
      title="Pickup in store"
      subtitle="Let customers pick up their orders at your locations"
      backUrl="/settings/shipments"
    >
      <InStorePickupLocations locations={locations} />
    </SettingsPageLayout>
  );
};
