import { Variant, VariantTable } from '../entities/variant';
import { Serializer } from './serializer';

export class VariantSerializer extends Serializer<Variant, VariantTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['deleted_at', 'deletedAt'],
      ['sale_price', 'salePrice'],
      ['comparison_price', 'comparisonPrice'],
      ['cost_per_unit', 'costPerUnit'],
      ['stock', 'stock'],
      ['sku', 'sku'],
      ['requires_shipping', 'requiresShipping'],
      ['weight', 'weight'],
      ['dimensions', 'dimensions']
    ]);
  }
}
