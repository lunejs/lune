import type { ID, LuneEntity, LuneTable } from './entity';

export interface CustomObjectDefinition extends LuneEntity {
  name: string;
  key: string;
  displayFieldId?: ID | null;
}

export interface CustomObjectDefinitionTable extends LuneTable {
  name: string;
  key: string;
  display_field_id?: ID | null;
  shop_id: ID;
}
