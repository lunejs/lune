import { useNavigate } from 'react-router';

import { useRemoveProducts } from '@/lib/product/hooks/use-remove-product';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useRemoveProductButton = () => {
  const navigate = useNavigate();
  const { loading, success, failure } = useLoadingNotification();
  const { removeProducts } = useRemoveProducts();

  const exec = async (id: string) => {
    loading('Removing...');
    const { isSuccess } = await removeProducts([id]);

    if (!isSuccess) {
      failure('Failed to remove products');
      return;
    }

    success('Product removed');
    navigate('/products');
  };

  return {
    removeProduct: exec
  };
};
