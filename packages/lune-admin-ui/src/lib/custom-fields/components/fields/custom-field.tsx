import { type CommonCustomFieldDefinitionFragment, CustomFieldType } from '@/lib/api/types';

import { IntegerCustomField } from './integer';
import { MultiLineTextCustomField } from './multi-line-text';
import { SingleLineTextCustomField } from './single-line-text';

export const CustomField = ({ definition, onChange }: Props) => {
  if (definition.type === CustomFieldType.SingleLineText) {
    return (
      <SingleLineTextCustomField
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.MultiLineText) {
    return (
      <MultiLineTextCustomField
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.Integer) {
    return (
      <IntegerCustomField onChange={value => onChange(definition, value)} definition={definition} />
    );
  }

  return null;
};

type Props = {
  onChange: (definition: CommonCustomFieldDefinitionFragment, value: unknown) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
