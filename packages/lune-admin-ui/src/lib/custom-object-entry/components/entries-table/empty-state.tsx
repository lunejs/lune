import { FileTextIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@lune/ui';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const CustomObjectEntriesTableEmptyState = ({ definitionId }: Props) => {
  return (
    <DataTableEmptyState
      title="No entries added"
      subtitle="Create entries to store data in this custom object."
      icon={<FileTextIcon />}
      actions={
        <Link to={`/custom-objects/${definitionId}/new`}>
          <Button>Add entry</Button>
        </Link>
      }
    />
  );
};

type Props = {
  definitionId: string;
};
