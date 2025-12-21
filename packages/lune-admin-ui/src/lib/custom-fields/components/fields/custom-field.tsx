import { type CommonCustomFieldDefinitionFragment, CustomFieldType } from '@/lib/api/types';

import { DecimalCustomField } from './decimal';
import { ImageCustomField } from './image';
import { IntegerCustomField } from './integer';
import { MultiLineTextCustomField } from './multi-line-text';
import { ProductReferenceCustomField } from './product-reference';
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

  if (definition.type === CustomFieldType.Decimal) {
    return (
      <DecimalCustomField onChange={value => onChange(definition, value)} definition={definition} />
    );
  }

  if (definition.type === CustomFieldType.Image) {
    return (
      <ImageCustomField onChange={value => onChange(definition, value)} definition={definition} />
    );
  }

  if (
    definition.type === CustomFieldType.Reference &&
    definition.metadata.targetEntity === 'product'
  ) {
    return (
      <ProductReferenceCustomField
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  return null;
};

type Props = {
  onChange: (definition: CommonCustomFieldDefinitionFragment, value: unknown) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
