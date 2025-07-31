import { VendyxEntity, VendyxTable } from './entity';

/**
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
export interface Variant extends VendyxEntity {
  deletedAt?: Date;
  /**
   * The variant's sale price
   */
  salePrice: number;
  /**
   * The variant's comparison price.
   * Useful when you want to mark a variant as on sale. Comparison price should be higher than the sale price.
   */
  comparisonPrice?: number;
  /**
   * The variant's cost per unit.
   * Useful when you want to calculate the profit of a variant.
   */
  costPerUnit?: number;
  /**
   * The variant's stock
   */
  stock: number;
  /**
   * The variant's SKU
   */
  sku?: string;
  /**
   * Indicates whether this variant requires shipping.
   */
  requiresShipping: boolean;
  /**
   * Weight in kg, e.g. 0.5
   */
  weight?: number;
  /**
   * Dimensions in cm, e.g. { length: 10, width: 5, height: 2 }
   */
  dimensions?: Record<string, unknown>;
}

export interface VariantTable extends VendyxTable {
  deleted_at?: Date;
  sale_price: number;
  comparison_price?: number;
  cost_per_unit?: number;
  stock: number;
  sku?: string;
  requires_shipping: boolean;
  weight?: number;
  dimensions?: Record<string, unknown>;
}
