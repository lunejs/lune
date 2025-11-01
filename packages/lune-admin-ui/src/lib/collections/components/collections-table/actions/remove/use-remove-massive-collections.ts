import { useRemoveCollections } from '@/lib/collections/hooks/use-remove-collections';
import { useTableContext } from '@/shared/components/data-table/data-table-context';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import type { CollectionsTableRow } from '../../collections-table';

export const useRemoveMassiveCollections = () => {
  const { removeCollections } = useRemoveCollections();

  const { table } = useTableContext<CollectionsTableRow>();
  const { loading, success, failure } = useLoadingNotification();

  const exec = async (ids: string[]) => {
    loading('Removing...');

    const prevRowSelection = table.getState().rowSelection;
    table.resetRowSelection();

    const result = await removeCollections(ids);

    if (!result.isSuccess) {
      table.setRowSelection(prevRowSelection);
      failure(result.error);
      return;
    }

    table.resetRowSelection();
    success('Collections removed');
  };

  return {
    removeMassiveCollections: exec
  };
};
