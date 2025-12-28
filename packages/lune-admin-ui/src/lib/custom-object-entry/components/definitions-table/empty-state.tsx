import { DatabaseIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@lune/ui';

import { DataTableEmptyState } from '@/shared/components/data-table/data-table-empty-state';

export const CustomObjectDefinitionsTableEmptyState = () => {
  return (
    <DataTableEmptyState
      title="No definitions added"
      subtitle="Create custom object definitions to store your custom data."
      icon={<DatabaseIcon />}
      actions={
        <Link to="/settings/custom-objects/new">
          <Button>Add definition</Button>
        </Link>
      }
    />
  );
};
