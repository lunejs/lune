import { useNavigate } from 'react-router';

import type { CustomFieldAppliesToEntity } from '@/lib/api/types';
import { useRemoveCustomFieldDefinition } from '@/lib/custom-fields/hooks/use-remove-custom-field-definition';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useRemoveCustomFieldButton = (entity: CustomFieldAppliesToEntity) => {
  const navigate = useNavigate();
  const { loading, success, failure } = useLoadingNotification();
  const { removeCustomFieldDefinition } = useRemoveCustomFieldDefinition();

  const exec = async (id: string) => {
    loading('Removing...');
    const result = await removeCustomFieldDefinition(id);

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Custom field removed');
    navigate(`/settings/custom-fields/${entity}`);
  };

  return {
    removeCustomField: exec
  };
};
