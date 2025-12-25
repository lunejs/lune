import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@lune/ui';

import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { CustomObjectDefinitionsTableColumns } from './columns';

export const CustomObjectDefinitionsTable = ({
  isRefetching,
  customObjectDefinitions,
  totalRows,
  dataTable
}: Props) => {
  const { pagination, updateFilters, updatePagination } = dataTable;

  return (
    <DataTable
      isLoading={isRefetching}
      data={customObjectDefinitions}
      columns={CustomObjectDefinitionsTableColumns}
      searchPlaceholder="Search definitions..."
      onSearch={q => updateFilters({ search: q })}
      onPageChange={page => updatePagination({ page })}
      onPageSizeChange={size => updatePagination({ size })}
      totalRows={totalRows}
      defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
      actions={
        <Link to="/custom-objects/new">
          <Button size="sm">
            <PlusIcon className="lg:hidden" />
            <span className="hidden lg:inline">Add Definition</span>
          </Button>
        </Link>
      }
    />
  );
};

export type CustomObjectDefinitionsTableRow = {
  id: string;
  name: string;
  key: string;
  totalFields: number;
};

export type CustomObjectDefinitionsTableFilters = {
  search: string;
};

type Props = {
  isRefetching: boolean;
  customObjectDefinitions: CustomObjectDefinitionsTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<CustomObjectDefinitionsTableFilters>;
};
