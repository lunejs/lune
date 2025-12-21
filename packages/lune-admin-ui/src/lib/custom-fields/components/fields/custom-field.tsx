import { type CommonCustomFieldDefinitionFragment, CustomFieldType } from '@/lib/api/types';

import { MultiLineTextCustomField } from './multi-line-text';
import { SingleLineTextCustomField } from './single-line-text';

export const CustomField = ({ definition, onChange }: Props) => {
  if (definition.type === CustomFieldType.SingleLineText) {
    return <SingleLineTextCustomField onChange={onChange} definition={definition} />;
  }

  if (definition.type === CustomFieldType.MultiLineText) {
    return <MultiLineTextCustomField onChange={onChange} definition={definition} />;
  }

  return null;
};

type Props = {
  onChange: (value: string) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
