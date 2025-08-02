import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Repository } from '../repository';
import { Option, OptionTable } from '@/persistence/entities/option';
import { OptionSerializer } from '@/persistence/serializers/option.serializer';

export class OptionRepository extends Repository<Option, OptionTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new OptionSerializer());
  }
}
