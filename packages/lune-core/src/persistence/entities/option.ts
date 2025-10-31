import type { LuneEntity, LuneTable } from './entity';

/**
 * An option represents a group of values which generates the variants of a product.
 * For example, some typical options are color, size, or material.
 */
export interface Option extends LuneEntity {
  deletedAt?: Date | null;
  /**
   * The option's name
   */
  name: string;
  /**
   * The option's order. This is used to sort the options in the storefront.
   */
  order: number;
}

export interface OptionTable extends LuneTable {
  deleted_at?: Date | null;
  name: string;
  order: number;
  shop_id: string;
}
