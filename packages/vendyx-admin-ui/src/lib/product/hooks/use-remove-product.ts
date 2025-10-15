import { queryClient } from '@/app/app';
import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { REMOVE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import { useTableContext } from '@/shared/components/data-table/data-table-context';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import type { TableProduct } from '../components/products-table/products-table';
import { ProductCacheKeys } from '../constants/cache-keys';

export const useRemoveProducts = () => {
  const { loading, success, failure } = useLoadingNotification();
  const { mutateAsync } = useGqlMutation(REMOVE_PRODUCT_MUTATION);
  const { table } = useTableContext<TableProduct>();

  const removeProducts = async (ids: string[]) => {
    try {
      loading('Removing...');

      const isSuccess = await mutateAsync({ ids });

      if (!isSuccess) {
        failure('Failed to remove products');
        return;
      }

      await queryClient.refetchQueries({ queryKey: [ProductCacheKeys.Products] });
      await queryClient.refetchQueries({ queryKey: [ProductCacheKeys.ProductsCount] });
      table.resetRowSelection();

      success('Products removed');
    } catch (error) {
      console.error(error);
      failure('Failed to remove products');
    }
  };

  return {
    removeProducts
  };
};
