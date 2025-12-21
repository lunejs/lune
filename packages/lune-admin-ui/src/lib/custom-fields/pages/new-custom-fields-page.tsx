import { useParams } from 'react-router';

import type { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { getEntityName } from '../utils/custom-field.utils';

export const NewCustomFieldPage = () => {
  const { entity } = useParams() as { entity: CustomFieldAppliesToEntity };

  return (
    <SettingsPageLayout
      title={`Add ${getEntityName(entity).toLowerCase()} custom fields`}
      backUrl={`/settings/custom-fields/${entity}`}
    ></SettingsPageLayout>
  );
};
