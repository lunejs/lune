import type { Transaction } from '@/persistence/connection';
import type { Collection, CollectionTable } from '@/persistence/entities/collection';
import { CollectionSerializer } from '@/persistence/serializers/collection.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CollectionRepository extends Repository<Collection, CollectionTable> {
  constructor(trx: Transaction) {
    super(Tables.Collection, trx, new CollectionSerializer());
  }
}
