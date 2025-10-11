import type { ID, VendyxEntity, VendyxTable } from './entity';

/**
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
export interface Variant extends VendyxEntity {
  deletedAt?: Date | null;
  /**
   * The variant's sale price
   */
  salePrice: number;
  /**
   * The variant's comparison price.
   * Useful when you want to mark a variant as on sale. Comparison price should be higher than the sale price.
   */
  comparisonPrice?: number | null;
  /**
   * The variant's cost per unit.
   * Useful when you want to calculate the profit of a variant.
   */
  costPerUnit?: number | null;
  /**
   * The variant's stock
   */
  stock: number;
  /**
   * The variant's SKU
   */
  sku?: string | null;
  /**
   * Indicates whether this variant requires shipping.
   */
  requiresShipping: boolean;
  /**
   * Weight in kg, e.g. 0.5
   */
  weight?: number | null;
  /**
   * Dimensions in cm, e.g. { length: 10, width: 5, height: 2 }
   */
  dimensions?: Record<string, unknown> | null;
  productId: ID;
}

export interface VariantTable extends VendyxTable {
  deleted_at?: Date | null;
  sale_price: number;
  comparison_price?: number | null;
  cost_per_unit?: number | null;
  stock: number;
  sku?: string | null;
  requires_shipping: boolean;
  weight?: number | null;
  dimensions?: Record<string, unknown> | null;
  product_id: string;
  shop_id: string;
}
