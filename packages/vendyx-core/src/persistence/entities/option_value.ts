import type { VendyxEntity, VendyxTable } from './entity';

/**
 * An option value represents a specific value of an option and is used to differentiate the variants of a product.
 * For example, if the option is color, the option value can be red, blue, or green.
 */
export interface OptionValue extends VendyxEntity {
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
  metadata?: Record<string, any>;
}

export interface OptionValueTable extends VendyxTable {
  deleted_at?: Date | null;
  name: string;
  order: number;
  metadata?: Record<string, any>;
  option_id: string;
  shop_id: string;
}
