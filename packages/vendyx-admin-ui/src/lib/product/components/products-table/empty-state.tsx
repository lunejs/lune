import { PackageIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@vendyx/ui';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const ProductsTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No product added"
      subtitle="You can start selling as son as you add a product"
      icon={<PackageIcon />}
      actions={
        <>
          <Link to="/products/new">
            <Button>Add product</Button>
          </Link>
          <Button variant={'outline'}>Import</Button>
        </>
      }
    />
  );
};
