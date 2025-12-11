import { PageLayout } from '@/shared/components/layout/page-layout';

import { CollectionsTable } from '../components/collections-table/collections-table';
import { CollectionsTableEmptyState } from '../components/collections-table/empty-state';
import { useCollectionsTable } from '../components/collections-table/use-collections-table';

export const CollectionsPage = () => {
  const result = useCollectionsTable();

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? (
        <CollectionsTableEmptyState />
      ) : (
        <CollectionsTable {...result} />
      )}
    </PageLayout>
  );
};
