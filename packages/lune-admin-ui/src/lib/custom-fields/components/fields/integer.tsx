import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const IntegerCustomField = ({ definition, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      definition={definition}
      onChange={items => onChange(items.map(v => Number(v.value)))}
      mapOnSave={i => ({ ...i, value: String(Math.trunc(Number(i.value))) })}
      inputProps={{
        type: 'number'
      }}
    />
  );
};

type Props = {
  onChange: (value: number[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
