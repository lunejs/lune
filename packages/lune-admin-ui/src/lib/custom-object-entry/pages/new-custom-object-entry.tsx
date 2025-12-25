import { useParams } from 'react-router';

import { useGetCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-get-custom-object-definition';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CustomObjectEntryDetails } from '../components/details/custom-object-entry-details';

export const NewCustomObjectEntryPage = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, customObjectDefinition } = useGetCustomObjectDefinition(id);

  if (isLoading) return <PageLoader />;

  if (!customObjectDefinition) return <NotFound />;

  return (
    <PageLayout className="max-w-5xl mx-auto w-full" isLoading={isLoading}>
      <CustomObjectEntryDetails definition={customObjectDefinition} />
    </PageLayout>
  );
};
