import type { Knex } from 'knex';

import type { CustomerFilters } from '@/api/shared/types/graphql';
import type { CustomerTable } from '@/persistence/entities/customer';

import { Tables } from '../tables';

import { BaseFilter } from './base.filter';

export class CustomerFilter extends BaseFilter<CustomerTable> {
  constructor(
    query: Knex.QueryBuilder,
    private readonly tableAlias: string = Tables.Customer
  ) {
    super(query);
  }

  applyFilters(filters: CustomerFilters) {
    if (filters.firstName) {
      if (filters.firstName.contains) {
        this.query.whereRaw(`LOWER(${this.tableAlias}.first_name) LIKE ?`, [
          `%${filters.firstName.contains.toLowerCase()}%`
        ]);
      } else if (filters.firstName.equals) {
        this.query.where(`${this.tableAlias}.first_name`, filters.firstName.equals);
      }
    }

    if (filters.lastName) {
      if (filters.lastName.contains) {
        this.query.whereRaw(`LOWER(${this.tableAlias}.last_name) LIKE ?`, [
          `%${filters.lastName.contains.toLowerCase()}%`
        ]);
      } else if (filters.lastName.equals) {
        this.query.where(`${this.tableAlias}.last_name`, filters.lastName.equals);
      }
    }

    if (filters.email) {
      if (filters.email.contains) {
        this.query.whereRaw(`LOWER(${this.tableAlias}.email) LIKE ?`, [
          `%${filters.email.contains.toLowerCase()}%`
        ]);
      } else if (filters.email.equals) {
        this.query.where(`${this.tableAlias}.email`, filters.email.equals);
      }
    }

    if (filters.enabled !== undefined) {
      this.query.where(`${this.tableAlias}.enabled`, filters.enabled?.equals);
    }

    return this;
  }
}
