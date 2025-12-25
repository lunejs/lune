import { type CommonCustomObjectDefinitionFragment } from '@/lib/api/types';

export const buildCustomObjectDefaults = (
  definition: CommonCustomObjectDefinitionFragment | null
) => {
  const definitions = definition?.fields.map(field => ({
    fieldId: field.id,
    name: field.name,
    quantity: field.isList ? 'multiple' : 'single',
    type: field.type
  }));
  return {
    name: definition?.name ?? '',
    displayField: definition?.displayField?.name ?? 'auto',
    fields: definitions?.length ? definitions : [{ name: '', quantity: 'single', type: '' }]
  };
};
