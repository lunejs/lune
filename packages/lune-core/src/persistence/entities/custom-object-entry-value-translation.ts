import type { ID, LuneEntity, LuneTable } from './entity';

export interface CustomObjectEntryValueTranslation extends LuneEntity {
  value: unknown;
  locale: string;
  entryValueId: ID;
}

export interface CustomObjectEntryValueTranslationTable extends LuneTable {
  value: unknown;
  locale: string;
  entry_value_id: ID;
  shop_id: ID;
}
