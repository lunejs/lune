import type { Transaction } from '@/persistence/connection';
import type {
  CustomObjectEntryValue,
  CustomObjectEntryValueTable
} from '@/persistence/entities/custom-object-entry-value';
import { CustomObjectEntryValueSerializer } from '@/persistence/serializers/custom-object-entry-value.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomObjectEntryValueRepository extends Repository<
  CustomObjectEntryValue,
  CustomObjectEntryValueTable
> {
  constructor(trx: Transaction) {
    super(Tables.CustomObjectEntryValue, trx, new CustomObjectEntryValueSerializer());
  }
}
