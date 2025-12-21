import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

import { PrimitiveCustomField } from './shared/primitive';

export const SingleLineTextCustomField = ({ definition, onChange }: Props) => {
  return (
    <PrimitiveCustomField
      definition={definition}
      onChange={items => onChange(items.map(v => v.value))}
    />
  );
};

type Props = {
  onChange: (value: string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
