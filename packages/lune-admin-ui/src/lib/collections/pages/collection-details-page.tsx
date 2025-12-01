import { useParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CollectionDetails } from '../components/collection-details/collection-details';
import { useGetCollection } from '../hooks/use-get-collection';

export const CollectionDetailsPage = () => {
  const params = useParams();

  const { isLoading, collection } = useGetCollection(params.id ?? '');

  if (!isLoading && !collection) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full" isLoading={isLoading}>
      <CollectionDetails collection={collection} />
    </PageLayout>
  );
};
