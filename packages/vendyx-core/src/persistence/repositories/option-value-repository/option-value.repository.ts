import { Transaction } from '@/persistence/connection';
import { OptionValue, OptionValueTable } from '@/persistence/entities/option_value';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OptionValueRepository extends Repository<OptionValue, OptionValueTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new OptionValueSerializer());
  }
}
