import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Product custom field
 */
export interface ProductCustomField extends LuneEntity {
  value: unknown;
  productId: ID;
  definitionId: ID;
}

export interface ProductCustomFieldTable extends LuneTable {
  value: unknown;
  product_id: ID;
  definition_id: ID;
  shop_id: ID;
}
