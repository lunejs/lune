import { useParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';

import { CollectionDetails } from '../components/collection-details/collection-details';
import { useGetCollection } from '../hooks/use-get-collection';

export const CollectionDetailsPage = () => {
  const params = useParams();

  const { isLoading, collection } = useGetCollection(params.id ?? '');

  return (
    <PageLayout className="max-w-[900px] mx-auto w-full" isLoading={isLoading}>
      <CollectionDetails collection={collection} />
    </PageLayout>
  );
};
