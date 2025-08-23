import { VendyxEntity, VendyxTable } from './entity';

/**
 * A product is a good or service that you want to sell.
 */
export interface Product extends VendyxEntity {
  deletedAt?: Date;
  /**
   * The product's name
   */
  name: string;
  /**
   * A human-friendly unique string for the Product automatically generated from its name
   */
  slug: string;
  /**
   * The product's description
   */
  description?: string;
  /**
   * Whether the products is enabled or not.
   * Not enabled products are not exposed to the storefront API but are visible in the admin ui.
   * Useful for products that are not published by now but they planned to be published in the future.
   */
  enabled: boolean;
  /**
   * Whether the product is archived or not.
   * Archived products are not exposed to the storefront API and are not visible in the admin ui by default.
   * Useful for products that are not available anymore but you don't want to lose their data.
   */
  archived: boolean;
  /**
   * The minimum price of the product
   * obtained from the variants sale prices.
   */
  minSalePrice: number;
  /**
   * The maximum price of the product
   * obtained from the variants sale prices.
   */
  maxSalePrice: number;
}

export interface ProductTable extends VendyxTable {
  deleted_at?: Date;
  name: string;
  slug: string;
  description?: string;
  enabled: boolean;
  archived: boolean;
  min_sale_price: number;
  max_sale_price: number;
  shop_id: string;
}
