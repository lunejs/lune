import { PackageIcon } from 'lucide-react';

import { Button } from '@vendyx/ui';

import { DataTableEmptyState } from '@/lib/shared/components/data-table/data-table-empty-state';

export const ProductsTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No product added"
      subtitle="You can start selling as son as you add a product"
      icon={<PackageIcon />}
      actions={
        <>
          <Button>Add product</Button>
          <Button variant={'outline'}>Import</Button>
        </>
      }
    />
  );
};
