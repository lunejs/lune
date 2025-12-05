import { useNavigate } from 'react-router';

import { useRemoveDiscounts } from '@/lib/discount/hooks/use-remove-discounts';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useRemoveDiscountButton = () => {
  const navigate = useNavigate();
  const { loading, success, failure } = useLoadingNotification();
  const { removeDiscounts } = useRemoveDiscounts();

  const exec = async (id: string) => {
    loading('Removing...');
    const { isSuccess } = await removeDiscounts([id]);

    if (!isSuccess) {
      failure('Failed to remove discount');
      return;
    }

    success('Discount removed');
    navigate('/discounts');
  };

  return {
    removeDiscount: exec
  };
};
