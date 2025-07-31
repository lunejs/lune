import { VendyxEntity, VendyxTable } from './entity';

/**
 * An option represents a group of values which generates the variants of a product.
 * For example, some typical options are color, size, or material.
 */
export interface Option extends VendyxEntity {
  deletedAt?: Date;
  /**
   * The option's name
   */
  name: string;
  /**
   * The option's order. This is used to sort the options in the storefront.
   */
  order: number;
}

export interface OptionTable extends VendyxTable {
  deleted_at?: Date;
  name: string;
  order: number;
}
