import { useRemoveProducts } from '@/lib/product/hooks/use-remove-product';
import { useTableContext } from '@/shared/components/data-table/data-table-context';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import type { TableProduct } from '../../products-table';

export const useRemoveMassiveProducts = () => {
  const { removeProducts } = useRemoveProducts();

  const { table } = useTableContext<TableProduct>();
  const { loading, success, failure } = useLoadingNotification();

  const exec = async (ids: string[]) => {
    loading('Removing...');

    const prevRowSelection = table.getState().rowSelection;
    table.resetRowSelection();

    const result = await removeProducts(ids);

    if (!result.isSuccess) {
      table.setRowSelection(prevRowSelection);
      failure(result.error);
      return;
    }

    table.resetRowSelection();
    success('Products removed');
  };

  return {
    removeMassiveProducts: exec
  };
};
