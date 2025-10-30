import { useArchiveProduct } from '@/lib/product/hooks/use-archive-product';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useArchiveProductButton = () => {
  const { loading, success, failure } = useLoadingNotification();
  const { archiveProduct } = useArchiveProduct();

  const exec = async (id: string) => {
    loading('Archiving...');

    const result = await archiveProduct(id);

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Product archived');
  };

  return {
    archiveProduct: exec
  };
};
