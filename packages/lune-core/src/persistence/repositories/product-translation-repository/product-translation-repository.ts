import type { Transaction } from '@/persistence/connection/connection';
import type {
  ProductTranslation,
  ProductTranslationTable
} from '@/persistence/entities/product-translation';
import { ProductTranslationSerializer } from '@/persistence/serializers/product-translation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ProductTranslationRepository extends Repository<
  ProductTranslation,
  ProductTranslationTable
> {
  constructor(trx: Transaction) {
    super(Tables.ProductTranslation, trx, new ProductTranslationSerializer());
  }
}
