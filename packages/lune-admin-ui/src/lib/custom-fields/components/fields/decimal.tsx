import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const DecimalCustomField = ({ definition, onChange }: Props) => {
  return (
    <PrimitiveCustomField
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
  onChange: (values: null | number | number[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
