import {
  type CustomFieldDefinitionTable,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';

export const DefaultCustomFieldDefinitionFixture = (): CustomFieldDefinitionTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: 'Default Custom Field',
  key: 'default_custom_field',
  is_list: false,
  applies_to_entity: 'PRODUCT',
  type: CustomFieldType.SingleLineText,
  metadata: null,
  custom_object_definition_id: null,
  order: 0,
  shop_id: crypto.randomUUID()
});
