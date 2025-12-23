import { useParams } from 'react-router';

import { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { useGetCustomFieldDefinitions } from '@/lib/custom-fields/hooks/use-get-custom-field-definitions';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CollectionDetails } from '../components/collection-details/collection-details';
import { useGetCollection } from '../hooks/use-get-collection';

export const CollectionDetailsPage = () => {
  const params = useParams();

  const { isLoading, collection } = useGetCollection(params.id ?? '');
  const { isLoading: isLoadingCustomFields, customFieldDefinitions } = useGetCustomFieldDefinitions(
    {
      filters: { appliesToEntity: CustomFieldAppliesToEntity.Collection }
    }
  );

  if (isLoading || isLoadingCustomFields) return <PageLoader />;

  if (!isLoading && !collection) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full" isLoading={isLoading}>
      <CollectionDetails customFieldDefinitions={customFieldDefinitions} collection={collection} />
    </PageLayout>
  );
};
