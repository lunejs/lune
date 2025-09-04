import { Transaction } from '@/persistence/connection';
import { Variant, VariantTable } from '@/persistence/entities/variant';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class VariantRepository extends Repository<Variant, VariantTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new VariantSerializer());
  }
}
