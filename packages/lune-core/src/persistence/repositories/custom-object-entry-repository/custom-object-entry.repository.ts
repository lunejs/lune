import type { ListInput } from '@/api/shared/types/graphql';
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

  async findByDefinitionKey(key: string, input?: ListInput) {
    const query = this.trx<CustomObjectEntryTable>({ e: Tables.CustomObjectEntry })
      .select('e.*')
      .innerJoin({ d: Tables.CustomObjectDefinition }, 'd.id', 'e.definition_id')
      .where('d.key', key)
      .orderBy('e.created_at', 'asc');

    if (input?.skip) {
      query.offset(input.skip);
    }

    if (input?.take) {
      query.limit(input.take);
    }

    return await query;
  }

  async countByDefinitionKey(key: string): Promise<number> {
    const result = await this.trx<CustomObjectEntryTable>({ e: Tables.CustomObjectEntry })
      .innerJoin({ d: Tables.CustomObjectDefinition }, 'd.id', 'e.definition_id')
      .where('d.key', key)
      .count('e.id as count')
      .first();

    return Number(result?.count ?? 0);
  }
}
