import { getSlugBy } from '@lunejs/common';
import { FormInput } from '@lunejs/ui';

import { useCustomFieldFormContext } from '../use-form/use-form';

export const CustomFieldName = () => {
  const { control, watch, definition } = useCustomFieldFormContext();

  const name = watch('name');

  return (
    <div className="flex flex-col gap-3">
      <FormInput
        control={control}
        name="name"
        label="Name"
        placeholder="Custom field"
        description={definition ? definition.key : name && getSlugBy(name, { replacement: '_' })}
      />
    </div>
  );
};
