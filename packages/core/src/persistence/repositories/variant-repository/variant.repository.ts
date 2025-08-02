import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Repository } from '../repository';
import { Variant, VariantTable } from '@/persistence/entities/variant';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';

export class VariantRepository extends Repository<Variant, VariantTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new VariantSerializer());
  }
}
