import { notification } from '@lune/ui';

import { useMarkOrderAsDelivered } from '@/lib/order/hooks/use-mark-order-as-delivered';

export const useMarkAsDeliveredButton = (onSuccess?: () => void) => {
  const { markAsDelivered, isLoading } = useMarkOrderAsDelivered();

  const exec = async (orderId: string) => {
    const result = await markAsDelivered(orderId);

    if (!result.isSuccess) {
      notification.error(result.error);
      return;
    }

    notification.success('Order marked as delivered');
    onSuccess?.();
  };

  return {
    markAsDelivered: exec,
    isLoading
  };
};
