import { useEffect, useMemo } from 'react';
import { CircleIcon, ListIcon } from 'lucide-react';

import { FormSelect } from '@lune/ui';

import { CustomFieldType } from '@/lib/api/types';

import { useCustomObjectFormContext } from '../use-form/use-form';

export const CustomFieldIsList = ({ index }: Props) => {
  const { control, watch, definition, setValue } = useCustomObjectFormContext();

  const type = watch(`fields.${index}.type`);

  const cannotBeList = useMemo(
    () =>
      [CustomFieldType.Boolean, CustomFieldType.MultiLineText].includes(type as CustomFieldType),
    [type]
  );

  useEffect(() => {
    if (cannotBeList) setValue(`fields.${index}.quantity`, 'single');
  }, [cannotBeList]);

  return (
    <FormSelect
      disabled={!!definition || cannotBeList}
      control={control}
      name={`fields.${index}.quantity`}
      items={[
        { label: 'One value', value: 'single', icon: CircleIcon },
        { label: 'List of values', value: 'multiple', icon: ListIcon }
      ]}
      className="w-40 shrink-0"
    />
  );
};

type Props = {
  index: number;
};
