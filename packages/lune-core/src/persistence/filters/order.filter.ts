import type { Knex } from 'knex';

import type { OrderFilters } from '@/api/shared/types/graphql';

import type { OrderTable } from '../entities/order';
import { Tables } from '../tables';

import { BaseFilter } from './base.filter';

export class OrderFilter extends BaseFilter<OrderTable> {
  constructor(
    query: Knex.QueryBuilder,
    private readonly tableAlias: string = Tables.Order
  ) {
    super(query);
  }

  applySort() {
    this.query.orderBy(`${this.tableAlias}.created_at`, 'desc');

    return this;
  }

  applyFilters(filters: OrderFilters) {
    const { states, code, customer } = filters;

    if (states?.length) {
      this.query.whereIn(`${this.tableAlias}.state`, states);
    } else {
      this.query.whereNotIn(`${this.tableAlias}.state`, ['MODIFYING', 'CANCELED']);
    }

    if (customer) {
      const tableAlias = this.tableAlias;

      this.query.andWhere(qb => {
        if (code?.contains) {
          qb.orWhereRaw(`LOWER(${tableAlias}.code) LIKE ?`, [`%${code.contains.toLowerCase()}%`]);
        } else if (code?.equals) {
          qb.orWhere(`${tableAlias}.code`, code.equals);
        }

        qb.orWhereExists(function () {
          this.select('*')
            .from(Tables.Customer)
            .whereRaw(`${Tables.Customer}.id = ${tableAlias}.customer_id`)
            .andWhere(customerQb => {
              if (customer.contains) {
                const searchTerm = `%${customer.contains.toLowerCase()}%`;
                customerQb
                  .orWhereRaw(`LOWER(${Tables.Customer}.first_name) LIKE ?`, [searchTerm])
                  .orWhereRaw(`LOWER(${Tables.Customer}.last_name) LIKE ?`, [searchTerm])
                  .orWhereRaw(`LOWER(${Tables.Customer}.email) LIKE ?`, [searchTerm]);
              } else if (customer.equals) {
                customerQb
                  .orWhere(`${Tables.Customer}.first_name`, customer.equals)
                  .orWhere(`${Tables.Customer}.last_name`, customer.equals)
                  .orWhere(`${Tables.Customer}.email`, customer.equals);
              }
            });
        });
      });
    } else if (code) {
      if (code.contains) {
        this.query.whereRaw(`LOWER(${this.tableAlias}.code) LIKE ?`, [
          `%${code.contains.toLowerCase()}%`
        ]);
      } else if (code.equals) {
        this.query.where(`${this.tableAlias}.code`, code.equals);
      }
    }

    return this;
  }
}
