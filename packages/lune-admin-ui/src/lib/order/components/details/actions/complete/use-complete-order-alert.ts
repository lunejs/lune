import { useState } from 'react';
import { notification } from '@lunejs/ui';

import { useMarkOrderAsCompleted } from '@/lib/order/hooks/use-mark-order-as-completed';

export const useCompleteOrderAlert = (onSuccess: () => void) => {
  const [error, setError] = useState<string | null>(null);
  const { markAsCompleted, isLoading } = useMarkOrderAsCompleted();

  const handleConfirm = async (orderId: string) => {
    setError(null);

    const result = await markAsCompleted(orderId);

    if (!result.isSuccess) {
      setError(result.error);
      return;
    }

    notification.success('Order marked as completed');
    onSuccess();
  };

  return {
    error,
    isLoading,
    handleConfirm
  };
};
