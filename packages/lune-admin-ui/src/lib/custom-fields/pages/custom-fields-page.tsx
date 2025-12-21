import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { CustomFieldsList } from '../components/list/custom-fields-list';
import { useGetCustomFieldDefinitions } from '../hooks/use-get-custom-field-definitions';

export const CustomFieldsPage = () => {
  const { isLoading, customFieldDefinitions } = useGetCustomFieldDefinitions();

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout title="Custom fields" subtitle="Add custom data where your store needs it.">
      <CustomFieldsList customFields={customFieldDefinitions} />
    </SettingsPageLayout>
  );
};
