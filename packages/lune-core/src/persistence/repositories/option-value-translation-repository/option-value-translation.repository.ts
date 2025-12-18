import type { Transaction } from '@/persistence/connection/connection';
import type {
  OptionValueTranslation,
  OptionValueTranslationTable
} from '@/persistence/entities/option-value-translation';
import { OptionValueTranslationSerializer } from '@/persistence/serializers/option-value-translation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OptionValueTranslationRepository extends Repository<
  OptionValueTranslation,
  OptionValueTranslationTable
> {
  constructor(trx: Transaction) {
    super(Tables.OptionValueTranslation, trx, new OptionValueTranslationSerializer());
  }
}
