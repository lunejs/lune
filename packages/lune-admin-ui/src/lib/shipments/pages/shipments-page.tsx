import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { ZonesTable } from '../components/zones-table/zones-table';

export const ShipmentsPage = () => {
  return (
    <SettingsPageLayout title="Shipments" subtitle="Manage your rates depending on your zones">
      <ZonesTable />
    </SettingsPageLayout>
  );
};
