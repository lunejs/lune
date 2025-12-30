import { FormSelect } from '@lunejs/ui';

import { CustomFieldType } from '@/lib/api/types';
import { useGetCustomObjectDefinitions } from '@/lib/custom-object-definition/hooks/use-get-custom-object-definitions';

import { useCustomFieldFormContext } from '../use-form/use-form';

export const CustomFieldTargetReference = () => {
  const { control, watch, definition } = useCustomFieldFormContext();
  const { isLoading, customObjectDefinitions } = useGetCustomObjectDefinitions();

  const type = watch('type');

  if (type !== CustomFieldType.CustomObjectReference) return null;

  return (
    <FormSelect
      placeholder="Select a definition"
      disabled={isLoading || !!definition}
      control={control}
      name="referenceTargetId"
      items={customObjectDefinitions.map(definition => ({
        label: definition.name,
        value: definition.id
      }))}
      className="flex-1"
    />
  );
};
