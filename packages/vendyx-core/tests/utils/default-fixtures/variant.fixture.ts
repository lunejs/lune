import { VariantTable } from '@/persistence/entities/variant';

export const DefaultVariantFixture = (): VariantTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: new Date(),
  requires_shipping: true,
  sale_price: 0,
  sku: '',
  stock: 0,
  comparison_price: 0,
  cost_per_unit: 0,
  dimensions: { length: 0, width: 0, height: 0 },
  weight: 0,
  product_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
