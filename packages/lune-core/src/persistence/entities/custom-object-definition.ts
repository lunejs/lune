import type { ID, LuneEntity, LuneTable } from './entity';

export interface CustomObjectDefinition extends LuneEntity {
  name: string;
  slug: string;
}

export interface CustomObjectDefinitionTable extends LuneTable {
  name: string;
  slug: string;
  shop_id: ID;
}
