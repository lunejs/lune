import type { Transaction } from '@/persistence/connection';
import type { Option, OptionTable } from '@/persistence/entities/option';
import { OptionSerializer } from '@/persistence/serializers/option.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OptionRepository extends Repository<Option, OptionTable> {
  constructor(trx: Transaction) {
    super(Tables.Option, trx, new OptionSerializer());
  }
}
