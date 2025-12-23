import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Collection custom field translation
 *
 * @sideeffect
 * - Remove on cascade when custom value is removed
 */
export interface CollectionCustomFieldTranslation extends LuneEntity {
  value: unknown;
  locale: string;
  fieldId: ID;
}

export interface CollectionCustomFieldTranslationTable extends LuneTable {
  value: unknown;
  locale: string;
  field_id: ID;
  shop_id: ID;
}
