import type { Knex } from 'knex';

import type { CustomObjectDefinitionFilters } from '@/api/shared/types/graphql';
import type { CustomObjectDefinitionTable } from '@/persistence/entities/custom-object-definition';

import { Tables } from '../tables';

import { BaseFilter } from './base.filter';

export class CustomObjectDefinitionFilter extends BaseFilter<CustomObjectDefinitionTable> {
  constructor(
    query: Knex.QueryBuilder,
    private readonly tableAlias: string = Tables.CustomObjectDefinition
  ) {
    super(query);
  }

  applyFilters(filters: CustomObjectDefinitionFilters) {
    if (filters.name) {
      if (filters.name.contains) {
        this.query.whereRaw(`LOWER(${this.tableAlias}.name) LIKE ?`, [
          `%${filters.name.contains.toLowerCase()}%`
        ]);
      } else if (filters.name.equals) {
        this.query.where(`${this.tableAlias}.name`, filters.name.equals);
      }
    }

    return this;
  }
}
