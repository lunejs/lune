import { useRemoveDiscounts } from '@/lib/discount/hooks/use-remove-discounts';
import { useTableContext } from '@/shared/components/data-table/data-table-context';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import type { DiscountsTableRow } from '../../discounts-table';

export const useRemoveDiscountsButton = () => {
  const { table } = useTableContext<DiscountsTableRow>();
  const { loading, success, failure } = useLoadingNotification();
  const { removeDiscounts } = useRemoveDiscounts();

  const exec = async (ids: string[]) => {
    loading('Removing...');

    const prevRowSelection = table.getState().rowSelection;
    table.resetRowSelection();

    const { isSuccess } = await removeDiscounts(ids);

    if (!isSuccess) {
      table.setRowSelection(prevRowSelection);
      failure('Failed to remove discounts');
      return;
    }

    table.resetRowSelection();
    success('Discounts removed');
  };

  return {
    removeDiscounts: exec
  };
};
