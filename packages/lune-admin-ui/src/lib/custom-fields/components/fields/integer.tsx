import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const IntegerCustomField = ({ definition, defaultValues, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      defaultValues={defaultValues?.map(dv => String(dv))}
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
  defaultValues?: number[];
  onChange: (value: null | number | number[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
