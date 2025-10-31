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
  name: string;
  /**
   * The option value's order
   */
  order: number;
  /**
   * The option value's metadata (e.g. color hex)
   */
  metadata?: Record<string, any> | null;

  optionId: ID;
}

export interface OptionValueTable extends LuneTable {
  deleted_at?: Date | null;
  name: string;
  order: number;
  metadata?: Record<string, any> | null;
  option_id: string;
  shop_id: string;
}
