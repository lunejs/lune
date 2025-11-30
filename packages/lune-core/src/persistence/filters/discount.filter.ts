import type { DiscountFilters } from '@/api/shared/types/graphql';

import type { DiscountTable } from '../entities/discount';

import { BaseFilter } from './base.filter';

export class DiscountFilter extends BaseFilter<DiscountTable> {
  applyFilters(filters: DiscountFilters) {
    if (filters.code) {
      if (filters.code.contains) {
        this.query.whereRaw(`LOWER(code) LIKE ?`, [`%${filters.code.contains.toLowerCase()}%`]);
      } else if (filters.code.equals) {
        this.query.where(`code`, filters.code.equals);
      }
    }

    if (filters.enabled !== undefined) {
      this.query.where('enabled', filters.enabled?.equals);
    }

    if (filters.active !== undefined) {
      const now = new Date();

      this.query.where('starts_at', '<=', now).andWhere(qb => {
        qb.whereNull('ends_at').orWhere('ends_at', '>=', now);
      });
    }

    return this;
  }
}
