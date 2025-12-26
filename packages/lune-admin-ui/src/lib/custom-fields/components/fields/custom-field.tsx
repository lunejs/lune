import { type CommonCustomFieldDefinitionFragment, CustomFieldType } from '@/lib/api/types';

import { BooleanCustomField } from './boolean';
import { CustomObjectReferenceCustomField } from './custom-object';
import { DateCustomField } from './date';
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

  if (definition.type === CustomFieldType.Boolean) {
    return (
      <BooleanCustomField
        defaultValues={defaultValues}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.Date) {
    return (
      <DateCustomField
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

  if (definition.type === CustomFieldType.ProductReference) {
    return (
      <ProductReferenceCustomField
        defaultValues={defaultValues}
        onChange={value => onChange(definition, value)}
        definition={definition}
      />
    );
  }

  if (definition.type === CustomFieldType.CustomObjectReference) {
    return (
      <CustomObjectReferenceCustomField
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
