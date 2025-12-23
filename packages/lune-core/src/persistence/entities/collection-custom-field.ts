import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Collection custom field
 */
export interface CollectionCustomField extends LuneEntity {
  value: unknown;
  collectionId: ID;
  definitionId: ID;
}

export interface CollectionCustomFieldTable extends LuneTable {
  value: unknown;
  collection_id: ID;
  definition_id: ID;
  shop_id: ID;
}
