import { useState } from 'react';

import { useRemoveShippingMethod } from '@/lib/shipments/hooks/use-remove-shipping-method';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { useZoneShippingMethodContext } from '../../zone-shipping-method-context';

export const useRemoveShippingMethodButton = () => {
  const { zone } = useZoneShippingMethodContext();
  const { loading, failure, success } = useLoadingNotification();
  const [isRemoving, setIsRemoving] = useState(false);

  const { removeShippingMethod } = useRemoveShippingMethod(zone.id);

  const exec = async (id: string) => {
    setIsRemoving(true);
    loading('Removing...');

    const result = await removeShippingMethod({ id });

    if (!result.isSuccess) {
      setIsRemoving(false);
      failure(result.error);
      return;
    }

    setIsRemoving(false);
    success('Shipping method removed');
  };

  return {
    isRemoving,
    removeShippingMethod: exec
  };
};
