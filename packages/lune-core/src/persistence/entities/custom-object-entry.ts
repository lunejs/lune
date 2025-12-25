import type { ID, LuneEntity, LuneTable } from './entity';

export interface CustomObjectEntry extends LuneEntity {
  slug: string;
  definitionId: ID;
}

export interface CustomObjectEntryTable extends LuneTable {
  slug: string;
  definition_id: ID;
  shop_id: ID;
}
