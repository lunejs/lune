import type { Knex } from 'knex';

import type { CustomFieldDefinitionFilters } from '@/api/shared/types/graphql';

import type { CustomFieldDefinitionTable } from '../entities/custom-field-definition';
import { Tables } from '../tables';

import { BaseFilter } from './base.filter';

export class CustomFieldDefinitionFilter extends BaseFilter<CustomFieldDefinitionTable> {
  constructor(
    query: Knex.QueryBuilder,
    private readonly tableAlias: string = Tables.CustomFieldDefinition
  ) {
    super(query);
  }

  applySort() {
    this.query.orderBy([
      { column: `${this.tableAlias}.order`, order: 'asc' },
      { column: `${this.tableAlias}.created_at`, order: 'asc' }
    ]);

    return this;
  }

  applyFilters(filters: CustomFieldDefinitionFilters) {
    if (filters.type) {
      this.query.where(`${this.tableAlias}.type`, filters.type);
    }

    if (filters.appliesToEntity) {
      this.query.where(`${this.tableAlias}.applies_to_entity`, filters.appliesToEntity);
    }

    return this;
  }
}
