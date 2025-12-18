import type { Transaction } from '@/persistence/connection/connection';
import type { OptionValue, OptionValueTable } from '@/persistence/entities/option_value';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OptionValueRepository extends Repository<OptionValue, OptionValueTable> {
  constructor(trx: Transaction) {
    super(Tables.OptionValue, trx, new OptionValueSerializer());
  }
}
