import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Repository } from '../repository';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { OptionValue } from '@/persistence/entities/option_value';

export class OptionValueRepository extends Repository<OptionValue> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new OptionValueSerializer());
  }
}
