import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * An option value preset represents a predefined value for an option preset.
 */
export interface OptionValuePreset extends LuneEntity {
  /**
   * The value's name
   */
  name: string;
  /**
   * Additional metadata (e.g., hex color for Color option)
   */
  metadata?: Record<string, any> | null;
  /**
   * The option preset this value belongs to
   */
  optionPresetId: ID;
}

export interface OptionValuePresetTable extends LuneTable {
  name: string;
  metadata?: Record<string, any> | null;
  option_preset_id: ID;
  shop_id: ID;
}
