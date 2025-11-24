import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * An option value represents a specific value of an option and is used to differentiate the variants of a product.
 * For example, if the option is color, the option value can be red, blue, or green.
 */
export interface OptionValue extends LuneEntity {
  deletedAt?: Date | null;
  /**
   * The option value's name
   */
  name?: string | null;
  /**
   * The option value's order
   */
  order: number;
  /**
   * The option this value belongs to
   */
  optionId: ID;
  /**
   * The option value preset this value has
   */
  presetId?: ID | null;
}

export interface OptionValueTable extends LuneTable {
  deleted_at?: Date | null;
  name?: string | null;
  order: number;
  option_id: string;
  shop_id: string;
  option_value_preset_id?: ID | null;
}
