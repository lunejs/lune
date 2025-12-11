import { PlusIcon } from 'lucide-react';

import { Button } from '@lune/ui';

import type { DiscountApplicationLevel, DiscountApplicationMode } from '@/lib/api/types';
import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { DiscountSelector } from '../discount-selector/discount-selector';

import { DiscountsTableActions } from './actions/discount-table-actions';
import { DiscountsTableColumns } from './columns';

export const DiscountsTable = ({ isRefetching, discounts, totalRows, dataTable }: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;

  return (
    <DataTable
      isLoading={isRefetching}
      data={discounts}
      columns={DiscountsTableColumns}
      onSearch={q => updateFilters({ search: q })}
      searchPlaceholder="Search discounts..."
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      actions={
        <DiscountSelector>
          <Button size="sm">
            <PlusIcon className="lg:hidden" />
            <span className="hidden lg:inline">Add Discount</span>
          </Button>
        </DiscountSelector>
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

type DiscountTableFilters = {
  search: string;
};

type Props = {
  isRefetching: boolean;
  discounts: DiscountsTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<DiscountTableFilters>;
};
