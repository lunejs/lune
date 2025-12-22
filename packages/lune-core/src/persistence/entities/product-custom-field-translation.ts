import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Product custom field translation
 */
export interface ProductCustomFieldTranslation extends LuneEntity {
  value: unknown;
  locale: string;
  productCustomFieldId: ID;
}

export interface ProductCustomFieldTranslationTable extends LuneTable {
  value: unknown;
  locale: string;
  product_custom_field_id: ID;
  shop_id: ID;
}
