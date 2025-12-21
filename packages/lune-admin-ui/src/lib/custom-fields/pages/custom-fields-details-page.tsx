import { useParams } from 'react-router';

import type { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CustomFieldDetails } from '../components/details/custom-field-details';
import { useGetCustomFieldDefinition } from '../hooks/use-get-custom-field-definition';

export const CustomFieldDetailsPage = () => {
  const { id, entity } = useParams() as { id: string; entity: CustomFieldAppliesToEntity };
  const { isLoading, customFieldDefinition } = useGetCustomFieldDefinition(id);

  if (isLoading) return <PageLoader />;

  if (!customFieldDefinition) return <NotFound />;

  return <CustomFieldDetails definition={customFieldDefinition} entity={entity} />;
};
