import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const IntegerCustomField = ({ definition, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      definition={definition}
      onChange={items => {
        const newValues = items.map(v => Number(v.value));

        if (definition.isList) onChange(newValues.length ? newValues : null);
        else onChange(newValues[0] ?? null);
      }}
      mapOnSave={i => ({ ...i, value: String(Math.trunc(Number(i.value))) })}
      inputProps={{ type: 'number' }}
    />
  );
};

type Props = {
  onChange: (value: null | number | number[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
