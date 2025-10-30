import { BoxesIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@lune/ui';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const CollectionsTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No Collections added"
      subtitle="Group your products by collections."
      icon={<BoxesIcon />}
      actions={
        <>
          <Link to="/collections/new">
            <Button>Add collection</Button>
          </Link>
          <Button variant={'outline'}>Import</Button>
        </>
      }
    />
  );
};
