import { TagIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@lune/ui';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const DiscountsTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No Discounts added"
      subtitle="Create discounts for your products and start selling with discounted prices."
      icon={<TagIcon />}
      actions={
        <>
          <Link to="/discounts/new">
            <Button>Add discount</Button>
          </Link>
          <Button variant={'outline'}>Import</Button>
        </>
      }
    />
  );
};
