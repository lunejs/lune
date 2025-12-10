import { useRemoveAssets } from '@/lib/asset/hooks/use-remove-assets';
import { useTableContext } from '@/shared/components/data-table/data-table-context';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import type { AssetsTableRow } from '../../assets-table';

export const useRemoveMassiveAssets = () => {
  const { removeAssets } = useRemoveAssets();

  const { table } = useTableContext<AssetsTableRow>();
  const { loading, success, failure } = useLoadingNotification();

  const exec = async (ids: string[]) => {
    loading('Removing...');

    const prevRowSelection = table.getState().rowSelection;
    table.resetRowSelection();

    const result = await removeAssets(ids);

    if (!result.isSuccess) {
      table.setRowSelection(prevRowSelection);
      failure(result.error);
      return;
    }

    table.resetRowSelection();
    success('Assets removed');
  };

  return {
    removeMassiveAssets: exec
  };
};
