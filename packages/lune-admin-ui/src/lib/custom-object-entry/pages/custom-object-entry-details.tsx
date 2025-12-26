import { useParams } from 'react-router';

import { useGetCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-get-custom-object-definition';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CustomObjectEntryDetails } from '../components/details/custom-object-entry-details';
import { useGetCustomObjectEntry } from '../hooks/use-get-custom-object-entry';

export const CustomObjectEntryDetailsPage = () => {
  const { id, entryId } = useParams() as { id: string; entryId: string };
  const { isLoading, customObjectDefinition } = useGetCustomObjectDefinition(id);
  const { isLoading: isLoadingEntry, customObjectEntry } = useGetCustomObjectEntry(entryId);

  if (isLoading || isLoadingEntry) return <PageLoader />;

  if (!customObjectDefinition || !customObjectEntry) return <NotFound />;

  return (
    <PageLayout className="max-w-3xl mx-auto w-full" isLoading={isLoading}>
      <CustomObjectEntryDetails definition={customObjectDefinition} entry={customObjectEntry} />
    </PageLayout>
  );
};
