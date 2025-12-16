import { useState } from 'react';

import { notification } from '@lune/ui';

import { useMarkOrderAsReadyForPickup } from '@/lib/order/hooks/use-mark-order-as-ready-for-pickup';

export const useReadyForPickupAlert = (onSuccess: () => void) => {
  const [error, setError] = useState<string | null>(null);
  const { markAsReadyForPickup, isLoading } = useMarkOrderAsReadyForPickup();

  const handleConfirm = async (orderId: string) => {
    setError(null);

    const result = await markAsReadyForPickup(orderId);

    if (!result.isSuccess) {
      setError(result.error);
      return;
    }

    notification.success('Order marked as ready for pickup');
    onSuccess();
  };

  return {
    error,
    isLoading,
    handleConfirm
  };
};
