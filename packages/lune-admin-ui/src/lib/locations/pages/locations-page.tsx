import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { LocationsTable } from '../components/locations-table/locations-table';
import { useGetLocations } from '../hooks/use-get-locations';

export const LocationsPage = () => {
  const { isLoading, locations } = useGetLocations();

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout title="Locations" subtitle="Manage your store locations">
      <LocationsTable locations={locations} />
    </SettingsPageLayout>
  );
};
