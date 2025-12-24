import type { ID, LuneEntity, LuneTable } from './entity';

export interface CustomObjectDefinition extends LuneEntity {
  name: string;
  key: string;
}

export interface CustomObjectDefinitionTable extends LuneTable {
  name: string;
  key: string;
  shop_id: ID;
}
