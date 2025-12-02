import { PageLayout } from '@/shared/components/layout/page-layout';

import { DiscountsTable } from '../components/table/discounts-table';

export const DiscountsPage = () => {
  return (
    <PageLayout>
      <DiscountsTable />
    </PageLayout>
  );
};
