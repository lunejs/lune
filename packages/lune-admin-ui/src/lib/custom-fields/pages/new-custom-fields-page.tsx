import { useParams } from 'react-router';

import type { CustomFieldAppliesToEntity } from '@/lib/api/types';

import { CustomFieldDetails } from '../components/details/custom-field-details';

export const NewCustomFieldPage = () => {
  const { entity } = useParams() as { entity: CustomFieldAppliesToEntity };

  return <CustomFieldDetails entity={entity} />;
};
