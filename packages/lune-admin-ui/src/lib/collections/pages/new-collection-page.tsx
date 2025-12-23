import { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { useGetCustomFieldDefinitions } from '@/lib/custom-fields/hooks/use-get-custom-field-definitions';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { CollectionDetails } from '../components/collection-details/collection-details';

export const NewCollectionPage = () => {
  const { isLoading, customFieldDefinitions } = useGetCustomFieldDefinitions({
    filters: { appliesToEntity: CustomFieldAppliesToEntity.Collection }
  });

  if (isLoading) return <PageLoader />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full">
      <CollectionDetails customFieldDefinitions={customFieldDefinitions} />
    </PageLayout>
  );
};
