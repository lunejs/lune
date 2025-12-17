import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { CustomersTableColumns } from './columns';

export const CustomersTable = ({
  isRefetching,
  customers,
  totalRows,
  dataTable,
  onStatusFilterChange
}: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;

  return (
    <DataTable
      isLoading={isRefetching}
      data={customers}
      columns={CustomersTableColumns}
      onSearch={q => updateFilters({ search: q })}
      searchPlaceholder="Search by name or email..."
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      filters={[
        {
          title: 'Status',
          options: [
            { label: 'Enabled', value: 'true' },
            { label: 'Disabled', value: 'false' }
          ],
          onChange: onStatusFilterChange
        }
      ]}
    />
  );
};

export type CustomersTableRow = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  ordersCount: number;
  totalSpent: number;
  enabled: boolean;
};

type CustomerTableFilters = {
  search: string;
  enabled: boolean | undefined;
};

type Props = {
  isRefetching: boolean;
  customers: CustomersTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<CustomerTableFilters>;
  onStatusFilterChange: (values: string[]) => void;
};
