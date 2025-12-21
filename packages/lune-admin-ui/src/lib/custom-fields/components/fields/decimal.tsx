import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const DecimalCustomField = ({ definition, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      definition={definition}
      onChange={items => onChange(items.map(v => Number(v.value)))}
      inputProps={{
        type: 'number'
      }}
    />
  );
};

type Props = {
  onChange: (values: number[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
