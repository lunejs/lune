import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const SingleLineTextCustomField = ({ definition, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      definition={definition}
      onChange={items => {
        const newValues = items.map(v => v.value);

        if (definition.isList) onChange(newValues.length ? newValues : null);
        else onChange(newValues[0] ?? null);
      }}
    />
  );
};

type Props = {
  onChange: (value: null | string | string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
