import { PageLayout } from '@/shared/components/layout/page-layout';

import { CollectionDetails } from '../components/collection-details/collection-details';

export const NewCollectionPage = () => {
  return (
    <PageLayout className="max-w-5xl mx-auto w-full">
      <CollectionDetails />
    </PageLayout>
  );
};
