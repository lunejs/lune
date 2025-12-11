import { PageLayout } from '@/shared/components/layout/page-layout';

import { DiscountsTable } from '../components/table/discounts-table';
import { DiscountsTableEmptyState } from '../components/table/empty-state';
import { useDiscountsTable } from '../components/table/use-discounts-table';

export const DiscountsPage = () => {
  const result = useDiscountsTable();

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? <DiscountsTableEmptyState /> : <DiscountsTable {...result} />}
    </PageLayout>
  );
};
