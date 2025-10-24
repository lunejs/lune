import type { Knex } from 'knex';

import type { CollectionListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { Collection, CollectionTable } from '@/persistence/entities/collection';
import { CollectionSerializer } from '@/persistence/serializers/collection.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CollectionRepository extends Repository<Collection, CollectionTable> {
  constructor(trx: Transaction) {
    super(Tables.Collection, trx, new CollectionSerializer());
  }

  async findByFilters(input: CollectionListInput) {
    const query = this.q();

    this.applyFilters(query, input.filters);

    if (input.take) query.limit(input.take);
    if (input.skip) query.offset(input.skip);

    query.orderBy('created_at', 'desc');

    const result = await query;
    return result.map(item => this.serializer.deserialize(item) as Collection);
  }

  async countByFilters(filters: CollectionListInput['filters']) {
    const query = this.q();

    this.applyFilters(query, filters);

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }

  private applyFilters(
    query: Knex.QueryBuilder<CollectionTable, any[]>,
    filters?: CollectionListInput['filters']
  ) {
    if (filters?.name) {
      if (filters.name.contains) {
        query.whereRaw('LOWER(name) LIKE ?', `%${filters.name.contains.toLowerCase()}%`);
      } else if (filters.name.equals) {
        query.where('name', filters.name.equals);
      }
    }

    if (filters?.enabled !== undefined) query.where('enabled', filters.enabled?.equals);

    if (filters?.contentType) {
      query.where('content_type', filters.contentType);
    } else {
      query.whereNull('parent_id');
    }
  }
}
