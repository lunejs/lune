import type { Transaction } from '@/persistence/connection/connection';
import type {
  ProductCustomFieldTranslation,
  ProductCustomFieldTranslationTable
} from '@/persistence/entities/product-custom-field-translation';
import { ProductCustomFieldTranslationSerializer } from '@/persistence/serializers/product-custom-field-translation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ProductCustomFieldTranslationRepository extends Repository<
  ProductCustomFieldTranslation,
  ProductCustomFieldTranslationTable
> {
  constructor(trx: Transaction) {
    super(Tables.ProductCustomFieldTranslation, trx, new ProductCustomFieldTranslationSerializer());
  }
}
