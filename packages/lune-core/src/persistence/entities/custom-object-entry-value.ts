import type { ID, LuneEntity, LuneTable } from './entity';

export interface CustomObjectEntryValue extends LuneEntity {
  value: unknown;
  entryId: ID;
  fieldId: ID;
}

export interface CustomObjectEntryValueTable extends LuneTable {
  value: unknown;
  entry_id: ID;
  field_id: ID;
  shop_id: ID;
}
