import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';

export const DefaultProductCustomFieldFixture = (): ProductCustomFieldTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  value: 'Default value',
  product_id: crypto.randomUUID(),
  definition_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
