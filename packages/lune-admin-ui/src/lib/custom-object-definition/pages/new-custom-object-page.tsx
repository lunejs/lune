import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { CustomObjectDetails } from '../components/details/custom-object-details';

export const NewCustomObjectPage = () => {
  return (
    <SettingsPageLayout title="Create custom object">
      <CustomObjectDetails />
    </SettingsPageLayout>
  );
};
