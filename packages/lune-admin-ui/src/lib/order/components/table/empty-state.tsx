import { ShoppingCartIcon } from 'lucide-react';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const OrdersTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No orders yet"
      subtitle="Orders will appear here once customers start purchasing"
      icon={<ShoppingCartIcon />}
    />
  );
};
