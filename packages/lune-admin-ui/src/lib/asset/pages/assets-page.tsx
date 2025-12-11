import { PageLayout } from '@/shared/components/layout/page-layout';

import { AssetsTable } from '../components/table/assets-table';
import { AssetsTableEmptyState } from '../components/table/empty-state';
import { useAssetsTable } from '../components/table/use-assets-table';

export const AssetsPage = () => {
  const result = useAssetsTable();

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? <AssetsTableEmptyState /> : <AssetsTable {...result} />}
    </PageLayout>
  );
};
