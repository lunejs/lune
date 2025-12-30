import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button, H4 } from '@lunejs/ui';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';
import { DataTable } from '@/shared/components/data-table/data-table';
import type { UseDataTableReturn } from '@/shared/components/data-table/use-data-table';

import { CustomObjectEntriesTableColumns } from './columns';

export const CustomObjectEntriesTable = ({
  definition,
  isRefetching,
  customObjectEntries,
  totalRows,
  dataTable
}: Props) => {
  const { pagination, updatePagination } = dataTable;

  return (
    <div className="relative">
      <div className="absolute h-8 flex items-center">
        <H4 className="">{definition.name}</H4>
      </div>
      <DataTable
        isLoading={isRefetching}
        data={customObjectEntries}
        columns={CustomObjectEntriesTableColumns}
        onPageChange={page => updatePagination({ page })}
        onPageSizeChange={size => updatePagination({ size })}
        totalRows={totalRows}
        defaultPagination={{ page: pagination.page, pageSize: pagination.size }}
        actions={
          <Link to={`/custom-objects/${definition.id}/new`}>
            <Button size="sm">
              <PlusIcon className="lg:hidden" />
              <span className="hidden lg:inline">Add Entry</span>
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export type CustomObjectEntriesTableRow = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  valuesCount: number;
  definitionId: string;
};

export type CustomObjectEntriesTableFilters = {
  search: string;
};

type Props = {
  definition: CommonCustomObjectDefinitionFragment;
  isRefetching: boolean;
  customObjectEntries: CustomObjectEntriesTableRow[];
  totalRows: number;
  dataTable: UseDataTableReturn<CustomObjectEntriesTableFilters>;
};
