import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Product custom field translation
 *
 * @sideeffect
 * - Remove on cascade when custom value is removed
 */
export interface ProductCustomFieldTranslation extends LuneEntity {
  value: unknown;
  locale: string;
  fieldId: ID;
}

export interface ProductCustomFieldTranslationTable extends LuneTable {
  value: unknown;
  locale: string;
  field_id: ID;
  shop_id: ID;
}
