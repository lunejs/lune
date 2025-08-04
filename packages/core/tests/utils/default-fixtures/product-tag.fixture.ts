import { ProductTagTable } from '@/persistence/entities/product-tag';

export const DefaultProductTagFixture = (): ProductTagTable => ({
  product_id: crypto.randomUUID(),
  tag_id: crypto.randomUUID()
});
