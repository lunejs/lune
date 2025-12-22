import { type CommonCustomFieldDefinitionFragment, CustomFieldType } from '@/lib/api/types';

import { DecimalCustomField } from './decimal';
import { ImageCustomField } from './image';
import { IntegerCustomField } from './integer';
import { MultiLineTextCustomField } from './multi-line-text';
import { ProductReferenceCustomField } from './product-reference';
import { SingleLineTextCustomField } from './single-line-text';

export const CustomField = ({ defaultValues, definition, onChange }: Props) => {
  if (definition.type === CustomFieldType.SingleLineText) {
    return (
      <SingleLineTextCustomField
        defaultValues={defaultValues}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.MultiLineText) {
    return (
      <MultiLineTextCustomField
        defaultValue={defaultValues?.[0]}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.Integer) {
    return (
      <IntegerCustomField
        defaultValues={defaultValues}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.Decimal) {
    return (
      <DecimalCustomField
        defaultValues={defaultValues}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.Image) {
    return (
      <ImageCustomField
        defaultValues={defaultValues}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (
    definition.type === CustomFieldType.Reference &&
    definition.metadata.targetEntity === 'product'
  ) {
    return (
      <ProductReferenceCustomField
        defaultValues={defaultValues}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  return null;
};

type Props = {
  defaultValues?: any[];
  onChange: (definition: CommonCustomFieldDefinitionFragment, value: unknown) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
