import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * An option preset represents a predefined option template available at the shop level.
 */
export interface OptionPreset extends LuneEntity {
  /**
   * The preset's name
   */
  name: string;
}

export interface OptionPresetTable extends LuneTable {
  name: string;
  shop_id: ID;
}
