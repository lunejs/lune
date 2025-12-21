import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { CustomFieldsTable } from '../components/table/custom-fields-table';
import { useGetCustomFieldDefinitions } from '../hooks/use-get-custom-field-definitions';

export const CustomFieldsPage = () => {
  const { isLoading, customFieldDefinitions } = useGetCustomFieldDefinitions();

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout title="Custom fields" subtitle="Add custom data where your store needs it.">
      <CustomFieldsTable customFields={customFieldDefinitions} />
    </SettingsPageLayout>
  );
};
