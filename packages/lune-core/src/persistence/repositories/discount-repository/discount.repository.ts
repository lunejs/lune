import type { DiscountListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { Discount, DiscountTable } from '@/persistence/entities/discount';
import { DiscountFilter } from '@/persistence/filters/discount.filter';
import { DiscountSerializer } from '@/persistence/serializers/discount.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class DiscountRepository extends Repository<Discount, DiscountTable> {
  constructor(trx: Transaction) {
    super(Tables.Discount, trx, new DiscountSerializer());
  }

  async findByFilters(input?: DiscountListInput) {
    const query = this.q();

    this.applyDeletedAtClause(query);

    const result = await new DiscountFilter(query)
      .applyPagination(input ?? {})
      .applyFilters(input?.filters ?? {})
      .build();

    return result.map(item => this.serializer.deserialize(item) as Discount);
  }

  async countByFilters(filters?: DiscountListInput['filters']) {
    const query = this.q();

    this.applyDeletedAtClause(query);

    new DiscountFilter(query).applyFilters(filters ?? {});

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }

  async findManyByCodes(codes: string[]): Promise<Discount[]> {
    const result = await this.q().whereIn('code', codes);

    return result.map(r => this.serializer.deserialize(r) as Discount);
  }
}
