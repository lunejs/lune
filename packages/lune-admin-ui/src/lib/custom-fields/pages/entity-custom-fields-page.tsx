import { useParams } from 'react-router';

import type { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { CustomFieldsTable } from '../components/table/custom-fields-table';
import { useGetCustomFieldDefinitions } from '../hooks/use-get-custom-field-definitions';
import { getEntityName } from '../utils/custom-field.utils';

export const EntityCustomFieldsPage = () => {
  const { entity } = useParams() as { entity: CustomFieldAppliesToEntity };

  const { isLoading, customFieldDefinitions } = useGetCustomFieldDefinitions({
    filters: { appliesToEntity: entity }
  });

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout
      title={`${getEntityName(entity)} custom fields`}
      subtitle={`Add custom data to your ${getEntityName(entity).toLowerCase()}s`}
      backUrl="/settings/custom-fields"
    >
      <CustomFieldsTable entity={entity} customFields={customFieldDefinitions} />
    </SettingsPageLayout>
  );
};
