import { type CommonCustomObjectDefinitionFragment } from '@/lib/api/types';

export const buildCustomObjectDefaults = (
  definition: CommonCustomObjectDefinitionFragment | null
) => ({
  name: definition?.name,
  displayField: definition?.displayField?.name ?? 'auto',
  fields: definition?.fields.map(field => ({
    fieldId: field.id,
    name: field.name,
    quantity: field.isList ? 'multiple' : 'single',
    type: field.type
  })) ?? [{ name: '', quantity: 'single', type: '' }]
});
