import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Repository } from '../repository';
import { Variant } from '@/persistence/entities/variant';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';

export class VariantRepository extends Repository<Variant> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new VariantSerializer());
  }
}
