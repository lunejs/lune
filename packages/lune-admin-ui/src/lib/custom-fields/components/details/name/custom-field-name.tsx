import { FormInput } from '@lune/ui';

import { useCustomFieldFormContext } from '../use-form/use-form';

export const CustomFieldName = () => {
  const { control, watch } = useCustomFieldFormContext();

  const name = watch('name');

  return (
    <div className="flex flex-col gap-3">
      <FormInput
        control={control}
        name="name"
        label="Name"
        placeholder="Custom field"
        // Replace with slugify in @lune/common
        description={name && `key: ${name.replaceAll(' ', '_').toLowerCase()}`}
      />
    </div>
  );
};
