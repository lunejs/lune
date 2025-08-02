import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Repository } from '../repository';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { OptionValue, OptionValueTable } from '@/persistence/entities/option_value';

export class OptionValueRepository extends Repository<OptionValue, OptionValueTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new OptionValueSerializer());
  }
}
