import type { Knex } from 'knex';

import type { ListInput } from '@/api/shared/types/graphql';
import { OrderBy } from '@/api/shared/types/graphql';

export abstract class BaseFilter {
  protected query: Knex.QueryBuilder;

  constructor(query: Knex.QueryBuilder) {
    this.query = query;
  }

  applyPagination(input: ListInput) {
    if (input.take) this.query.limit(input.take);
    if (input.skip) this.query.offset(input.skip);

    return this;
  }

  build() {
    return this.query;
  }

  protected toOrder(orderBy: OrderBy) {
    return orderBy === OrderBy.Asc ? 'asc' : 'desc';
  }
}
