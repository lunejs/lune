import type { LuneEntity, LuneTable } from './entity';

/**
 * A zone represents a geographical area for shipping purposes.
 */
export interface Zone extends LuneEntity {
  /**
   * The zone's name.
   */
  name: string;
}

export interface ZoneTable extends LuneTable {
  name: string;
  shop_id: string;
}
