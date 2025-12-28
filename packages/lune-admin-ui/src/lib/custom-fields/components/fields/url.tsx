import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const UrlCustomField = ({ definition, defaultValues, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      defaultValues={defaultValues}
      definition={definition}
      placeholder="https://"
      onChange={items => {
        const newValues = items.map(v => v.value);

        if (definition.isList) onChange(newValues.length ? newValues : null);
        else onChange(newValues[0] ?? null);
      }}
    />
  );
};

type Props = {
  defaultValues?: string[];
  onChange: (value: null | string | string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
