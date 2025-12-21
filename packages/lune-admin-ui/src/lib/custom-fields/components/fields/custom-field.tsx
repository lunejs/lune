import { type CommonCustomFieldDefinitionFragment, CustomFieldType } from '@/lib/api/types';

import { SingleLineTextCustomField } from './single-line-text';

export const CustomField = ({ definition, onChange }: Props) => {
  if (definition.type === CustomFieldType.SingleLineText) {
    return <SingleLineTextCustomField onChange={onChange} definition={definition} />;
  }

  return null;
};

type Props = {
  onChange: (value: string) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
