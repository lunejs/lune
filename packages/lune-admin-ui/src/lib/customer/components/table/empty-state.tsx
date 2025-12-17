import { UsersIcon } from 'lucide-react';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const CustomersTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No customers yet"
      subtitle="Customers will appear here once they create an account"
      icon={<UsersIcon />}
    />
  );
};
