import { useParams } from 'react-router';

import { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { CustomFieldsTable } from '../components/table/custom-fields-table';
import { useGetCustomFieldDefinitions } from '../hooks/use-get-custom-field-definitions';

export const EntityCustomFieldsPage = () => {
  const { entity } = useParams() as { entity: CustomFieldAppliesToEntity };

  const { isLoading, customFieldDefinitions } = useGetCustomFieldDefinitions({
    filters: { appliesToEntity: entity }
  });

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout
      title={getTitle(entity)}
      subtitle={getSubtitle(entity)}
      backUrl="/settings/custom-fields"
    >
      <CustomFieldsTable entity={entity} customFields={customFieldDefinitions} />
    </SettingsPageLayout>
  );
};

const getTitle = (entity: CustomFieldAppliesToEntity) => {
  const TITLES: Record<CustomFieldAppliesToEntity, string> = {
    [CustomFieldAppliesToEntity.Product]: 'Product custom fields',
    [CustomFieldAppliesToEntity.Collection]: 'Collection custom fields',
    [CustomFieldAppliesToEntity.CustomObject]: ''
  };

  return TITLES[entity];
};

const getSubtitle = (entity: CustomFieldAppliesToEntity) => {
  const SUBTITLES: Record<CustomFieldAppliesToEntity, string> = {
    [CustomFieldAppliesToEntity.Product]: 'Add custom data to your products',
    [CustomFieldAppliesToEntity.Collection]: 'Add custom data to your collections',
    [CustomFieldAppliesToEntity.CustomObject]: ''
  };

  return SUBTITLES[entity];
};
