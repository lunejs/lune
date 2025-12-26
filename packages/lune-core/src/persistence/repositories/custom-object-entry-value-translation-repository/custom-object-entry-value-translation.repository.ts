import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomObjectEntryValueTranslation,
  CustomObjectEntryValueTranslationTable
} from '@/persistence/entities/custom-object-entry-value-translation';
import { CustomObjectEntryValueTranslationSerializer } from '@/persistence/serializers/custom-object-entry-value-translation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomObjectEntryValueTranslationRepository extends Repository<
  CustomObjectEntryValueTranslation,
  CustomObjectEntryValueTranslationTable
> {
  constructor(trx: Transaction) {
    super(
      Tables.CustomObjectEntryValueTranslation,
      trx,
      new CustomObjectEntryValueTranslationSerializer()
    );
  }
}
