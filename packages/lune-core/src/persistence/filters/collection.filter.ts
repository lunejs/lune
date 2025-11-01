import type { Knex } from 'knex';

import type { CollectionFilters } from '@/api/shared/types/graphql';

import type { CollectionTable } from '../entities/collection';
import { Tables } from '../tables';

import { BaseFilter } from './base.filter';

export class CollectionFilter extends BaseFilter<CollectionTable> {
  constructor(
    query: Knex.QueryBuilder,
    private readonly tableAlias: string = Tables.Collection
  ) {
    super(query);
  }

  applySort() {
    this.query.orderBy(`${this.tableAlias}.created_at`, 'desc');

    return this;
  }

  applyFilters(filters: CollectionFilters) {
    if (filters.name) {
      if (filters.name.contains) {
        this.query.whereRaw(`LOWER(${this.tableAlias}.name) LIKE ?`, [
          `%${filters.name.contains.toLowerCase()}%`
        ]);
      } else if (filters.name.equals) {
        this.query.where(`${this.tableAlias}.name`, filters.name.equals);
      }
    }

    if (filters.enabled !== undefined) {
      this.query.where(`${this.tableAlias}.enabled`, filters.enabled?.equals);
    }

    if (filters?.contentType) {
      this.query.where(`${this.tableAlias}.content_type`, filters.contentType);
    }

    if (filters.isTopLevel !== undefined) {
      if (filters.isTopLevel?.equals === true) {
        this.query.whereNull(`${this.tableAlias}.parent_id`);
      } else if (filters.isTopLevel?.equals === false) {
        this.query.whereNotNull(`${this.tableAlias}.parent_id`);
      }
    }

    return this;
  }
}
