import type { Transaction } from '@/persistence/connection';
import type {
  CustomObjectEntry,
  CustomObjectEntryTable
} from '@/persistence/entities/custom-object-entry';
import { CustomObjectEntrySerializer } from '@/persistence/serializers/custom-object-entry.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomObjectEntryRepository extends Repository<
  CustomObjectEntry,
  CustomObjectEntryTable
> {
  constructor(trx: Transaction) {
    super(Tables.CustomObjectEntry, trx, new CustomObjectEntrySerializer());
  }
}
