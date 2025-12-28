import { useNavigate } from 'react-router';

import { useRemoveCustomObjectDefinition } from '@/lib/custom-object-definition/hooks/use-remove-custom-object-definition';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useRemoveCustomObjectDefinitionAlert = () => {
  const navigate = useNavigate();
  const { loading, success, failure } = useLoadingNotification();
  const { removeCustomObjectDefinition } = useRemoveCustomObjectDefinition();

  const exec = async (id: string) => {
    loading('Removing...');
    const { isSuccess } = await removeCustomObjectDefinition(id);

    if (!isSuccess) {
      failure('Failed to remove definition');
      return;
    }

    success('Custom object definition removed');
    navigate('/settings/custom-objects');
  };

  return {
    removeCustomObjectDefinition: exec
  };
};
