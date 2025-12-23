import type { Transaction } from '@/persistence/connection/connection';
import type {
  CollectionCustomFieldTranslation,
  CollectionCustomFieldTranslationTable
} from '@/persistence/entities/collection-custom-field-translation';
import { CollectionCustomFieldTranslationSerializer } from '@/persistence/serializers/collection-custom-field-translation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CollectionCustomFieldTranslationRepository extends Repository<
  CollectionCustomFieldTranslation,
  CollectionCustomFieldTranslationTable
> {
  constructor(trx: Transaction) {
    super(
      Tables.CollectionCustomFieldTranslation,
      trx,
      new CollectionCustomFieldTranslationSerializer()
    );
  }
}
