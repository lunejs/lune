import type { Transaction } from '@/persistence/connection/connection';
import type {
  CollectionCustomField,
  CollectionCustomFieldTable
} from '@/persistence/entities/collection-custom-field';
import { CollectionCustomFieldSerializer } from '@/persistence/serializers/collection-custom-field.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CollectionCustomFieldRepository extends Repository<
  CollectionCustomField,
  CollectionCustomFieldTable
> {
  constructor(trx: Transaction) {
    super(Tables.CollectionCustomField, trx, new CollectionCustomFieldSerializer());
  }
}
