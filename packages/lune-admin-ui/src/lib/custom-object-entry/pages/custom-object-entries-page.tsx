import { useParams } from 'react-router';

import { PageLayout } from '@/shared/components/layout/page-layout';

import { CustomObjectEntriesTable } from '../components/entries-table/custom-object-entries-table';
import { CustomObjectEntriesTableEmptyState } from '../components/entries-table/empty-state';
import { useCustomObjectEntriesTable } from '../components/entries-table/use-custom-object-entries-table';

export const CustomObjectEntriesPage = () => {
  const { id } = useParams() as { id: string };
  const result = useCustomObjectEntriesTable(id);

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? (
        <CustomObjectEntriesTableEmptyState definitionId={id} />
      ) : (
        <CustomObjectEntriesTable definitionId={id} {...result} />
      )}
    </PageLayout>
  );
};
