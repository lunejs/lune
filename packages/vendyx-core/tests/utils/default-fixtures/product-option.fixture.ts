import { ProductOptionTable } from '@/persistence/entities/product-option';

export const DefaultProductOptionFixture = (): ProductOptionTable => ({
  option_id: crypto.randomUUID(),
  product_id: crypto.randomUUID()
});
