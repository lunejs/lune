import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const BooleanCustomField = ({ definition, defaultValues, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      bool
      defaultValues={defaultValues?.map(dv => String(dv))}
      definition={definition}
      onChange={items => {
        const [value] = items;

        onChange(value?.value ? value?.value === 'true' : null);
      }}
    />
  );
};

type Props = {
  defaultValues?: boolean[];
  onChange: (value: null | boolean) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
