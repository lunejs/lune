import { useNavigate } from 'react-router';

import { useRemoveZone } from '@/lib/shipments/hooks/use-remove-zone';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useRemoveZoneDialog = () => {
  const navigate = useNavigate();
  const { loading, success, failure } = useLoadingNotification();
  const { removeZone } = useRemoveZone();

  const exec = async (id: string) => {
    loading('Removing...');
    const { isSuccess } = await removeZone(id);

    if (!isSuccess) {
      failure('Failed to remove zone');
      return;
    }

    success('Zone removed');
    navigate('/settings/shipments');
  };

  return {
    removeZone: exec
  };
};
