import { PageLayout } from '@/shared/components/layout/page-layout';

import { CustomersTable } from '../components/table/customers-table';
import { CustomersTableEmptyState } from '../components/table/empty-state';
import { useCustomersTable } from '../components/table/use-customers-table';

export const CustomersPage = () => {
  const result = useCustomersTable();

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? (
        <CustomersTableEmptyState />
      ) : (
        <CustomersTable {...result} />
      )}
    </PageLayout>
  );
};
