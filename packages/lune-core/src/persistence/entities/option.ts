import type { ID, LuneEntity, LuneTable } from './entity';

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
  /**
   * The product this option belongs to
   */
  productId: ID;
}

export interface OptionTable extends LuneTable {
  deleted_at?: Date | null;
  name: string;
  order: number;
  product_id: ID;
  shop_id: string;
}
