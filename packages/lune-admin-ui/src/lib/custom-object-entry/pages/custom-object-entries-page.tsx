import { useParams } from 'react-router';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';
import { useGetCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-get-custom-object-definition';
import { PageLayout } from '@/shared/components/layout/page-layout';
import { NotFound } from '@/shared/components/not-found/not-found';

import { CustomObjectEntriesTable } from '../components/entries-table/custom-object-entries-table';
import { CustomObjectEntriesTableEmptyState } from '../components/entries-table/empty-state';
import { useCustomObjectEntriesTable } from '../components/entries-table/use-custom-object-entries-table';

export const CustomObjectEntriesPage = () => {
  const { id } = useParams() as { id: string };
  const definitionRes = useGetCustomObjectDefinition(id);
  const result = useCustomObjectEntriesTable(definitionRes.customObjectDefinition);

  if (!definitionRes.customObjectDefinition && !definitionRes.isLoading) return <NotFound />;

  return (
    <PageLayout isLoading={result.isLoading || definitionRes.isLoading}>
      {result.shouldRenderEmptyState ? (
        <CustomObjectEntriesTableEmptyState
          definition={definitionRes.customObjectDefinition as CommonCustomObjectDefinitionFragment}
        />
      ) : (
        <CustomObjectEntriesTable
          definition={definitionRes.customObjectDefinition as CommonCustomObjectDefinitionFragment}
          {...result}
        />
      )}
    </PageLayout>
  );
};
