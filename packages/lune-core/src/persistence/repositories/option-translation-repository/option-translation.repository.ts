import type { Transaction } from '@/persistence/connection/connection';
import type {
  OptionTranslation,
  OptionTranslationTable
} from '@/persistence/entities/option-translation';
import { OptionTranslationSerializer } from '@/persistence/serializers/option-translation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OptionTranslationRepository extends Repository<
  OptionTranslation,
  OptionTranslationTable
> {
  constructor(trx: Transaction) {
    super(Tables.OptionTranslation, trx, new OptionTranslationSerializer());
  }
}
