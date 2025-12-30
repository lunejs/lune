import { Button } from '@lunejs/ui';
import { FileTextIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';
import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const CustomObjectEntriesTableEmptyState = ({ definition }: Props) => {
  const { id } = useParams() as { id: string };

  return (
    <DataTableEmptyState
      title={`No entries added for ${definition.name}`}
      subtitle="Create entries to store data in this custom object."
      icon={<FileTextIcon />}
      actions={
        <Link to={`/custom-objects/${id}/new`}>
          <Button>Add entry</Button>
        </Link>
      }
    />
  );
};

type Props = {
  definition: CommonCustomObjectDefinitionFragment;
};
