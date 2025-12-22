import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const DecimalCustomField = ({ definition, defaultValues, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      defaultValues={defaultValues?.map(dv => String(dv))}
      definition={definition}
      onChange={items => {
        const values = items.map(v => Number(v.value));

        if (definition.isList) onChange(values.length ? values : null);
        else onChange(values[0] ?? null);
      }}
      inputProps={{
        type: 'number'
      }}
    />
  );
};

type Props = {
  defaultValues?: number[];
  onChange: (values: null | number | number[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
