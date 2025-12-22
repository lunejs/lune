import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Product custom field translation
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
