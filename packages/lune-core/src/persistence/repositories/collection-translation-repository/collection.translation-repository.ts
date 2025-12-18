import type { Transaction } from '@/persistence/connection/connection';
import type {
  CollectionTranslation,
  CollectionTranslationTable
} from '@/persistence/entities/collection-translation';
import { CollectionTranslationSerializer } from '@/persistence/serializers/collection-translation.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CollectionTranslationRepository extends Repository<
  CollectionTranslation,
  CollectionTranslationTable
> {
  constructor(trx: Transaction) {
    super(Tables.CollectionTranslation, trx, new CollectionTranslationSerializer());
  }
}
