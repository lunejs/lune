import { useNavigate } from 'react-router';

import { useRemoveCustomObjectEntry } from '@/lib/custom-object-entry/hooks/use-remove-custom-object-entry';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { useCustomObjectEntryFormContext } from '../../use-form/use-form';

export const useRemoveCustomObjectEntryAlert = () => {
  const navigate = useNavigate();
  const { definition } = useCustomObjectEntryFormContext();
  const { loading, success, failure } = useLoadingNotification();
  const { removeCustomObjectEntry } = useRemoveCustomObjectEntry();

  const exec = async (id: string) => {
    loading('Removing...');
    const { isSuccess } = await removeCustomObjectEntry([id]);

    if (!isSuccess) {
      failure('Failed to remove entry');
      return;
    }

    success('Custom object entry removed');
    navigate(`/custom-objects/${definition.id}`);
  };

  return {
    removeCustomObjectEntry: exec
  };
};
