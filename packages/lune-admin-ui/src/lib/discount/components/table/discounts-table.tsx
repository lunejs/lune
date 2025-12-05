import { PlusIcon } from 'lucide-react';

import { Button } from '@lune/ui';

import type { DiscountApplicationLevel, DiscountApplicationMode } from '@/lib/api/types';
import { DataTable } from '@/shared/components/data-table/data-table';

import { DiscountSelector } from '../discount-selector/discount-selector';

import { DiscountsTableActions } from './actions/discount-table-actions';
import { DiscountsTableColumns } from './columns';
import { DiscountsTableEmptyState } from './empty-state';
import { useDiscountsTable } from './use-discounts-table';

export const DiscountsTable = () => {
  const { shouldRenderEmptyState, isLoading, isRefetching, discounts, onUpdate, pagination } =
    useDiscountsTable();

  if (shouldRenderEmptyState) return <DiscountsTableEmptyState />;

  return (
    <DataTable
      isLoading={isLoading || isRefetching}
      data={discounts}
      columns={DiscountsTableColumns}
      onSearch={async query => onUpdate({ query })}
      searchPlaceholder="Search discounts..."
      onPageChange={page => onUpdate({ page })}
      onPageSizeChange={size => onUpdate({ size })}
      totalRows={pagination.pageInfo?.total ?? 0}
      defaultPagination={{ page: 1, pageSize: 10 }}
      actions={
        <>
          <DiscountSelector>
            <Button size="sm">
              <PlusIcon className="lg:hidden" />
              <span className="hidden lg:inline">Add Discount</span>
            </Button>
          </DiscountSelector>
        </>
      }
      onSelectRender={rows => <DiscountsTableActions rows={rows} />}
    />
  );
};

export type DiscountsTableRow = {
  id: string;
  code: string;
  applicationMode: DiscountApplicationMode;
  applicationLevel: DiscountApplicationLevel;
  enabled: boolean;
  startsAt: Date;
  endsAt?: Date;
};
