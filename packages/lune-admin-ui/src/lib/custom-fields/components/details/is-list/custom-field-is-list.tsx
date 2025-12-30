import { useEffect, useMemo } from 'react';
import { CircleIcon, ListIcon } from 'lucide-react';

import { FormSelect } from '@lunejs/ui';

import { CustomFieldType } from '@/lib/api/types';

import { useCustomFieldFormContext } from '../use-form/use-form';

export const CustomFieldIsList = () => {
  const { control, watch, definition, setValue } = useCustomFieldFormContext();

  const type = watch('type');

  const cannotBeList = useMemo(
    () =>
      [CustomFieldType.Boolean, CustomFieldType.MultiLineText].includes(type as CustomFieldType),
    [type]
  );

  useEffect(() => {
    if (cannotBeList) setValue('quantity', 'single');
  }, [cannotBeList]);

  return (
    <FormSelect
      disabled={!!definition || cannotBeList}
      label="Type"
      control={control}
      name="quantity"
      items={[
        { label: 'One value', value: 'single', icon: CircleIcon },
        { label: 'List of values', value: 'multiple', icon: ListIcon }
      ]}
      className="w-40 shrink-0"
    />
  );
};
