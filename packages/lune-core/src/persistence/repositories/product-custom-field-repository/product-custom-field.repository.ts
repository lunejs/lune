import type { Transaction } from '@/persistence/connection/connection';
import type {
  ProductCustomField,
  ProductCustomFieldTable
} from '@/persistence/entities/product-custom-field';
import { ProductCustomFieldSerializer } from '@/persistence/serializers/product-custom-field.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ProductCustomFieldRepository extends Repository<
  ProductCustomField,
  ProductCustomFieldTable
> {
  constructor(trx: Transaction) {
    super(Tables.ProductCustomField, trx, new ProductCustomFieldSerializer());
  }
}
