import { TagIcon } from 'lucide-react';

import { Button } from '@lunejs/ui';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

import { DiscountSelector } from '../discount-selector/discount-selector';

export const DiscountsTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No Discounts added"
      subtitle="Create discounts for your products and start selling with discounted prices."
      icon={<TagIcon />}
      actions={
        <>
          <DiscountSelector>
            <Button>Add discount</Button>
          </DiscountSelector>
          <Button variant={'outline'}>Import</Button>
        </>
      }
    />
  );
};
