import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const MultiLineTextCustomField = ({ defaultValue, definition, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      textarea
      defaultValues={defaultValue ? [defaultValue] : []}
      definition={definition}
      onChange={items => {
        const newValues = items.map(v => v.value);

        onChange(newValues[0] ?? null);
      }}
    />
  );
};

type Props = {
  defaultValue?: string;
  onChange: (value: null | string) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
