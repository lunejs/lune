import { queryClient } from '@/app/app';
import { useRemoveCustomFieldDefinition } from '@/lib/custom-fields/hooks/use-remove-custom-field-definition';
import { CustomObjectDefinitionCacheKeys } from '@/lib/custom-object-definition/constants/cache-keys';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { useCustomObjectFormContext } from '../../use-form/use-form';

export const useRemoveCustomFieldButton = () => {
  const { definition } = useCustomObjectFormContext();
  const { loading, success, failure } = useLoadingNotification();
  const { removeCustomFieldDefinition } = useRemoveCustomFieldDefinition();

  const exec = async (id: string) => {
    loading('Removing...');
    const result = await removeCustomFieldDefinition(id);

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    await queryClient.refetchQueries({
      queryKey: [CustomObjectDefinitionCacheKeys.Unique(definition?.id as string)]
    });
    success('Custom field removed');
  };

  return {
    removeCustomField: exec
  };
};
