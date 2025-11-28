import type { AssetFilters } from '@/api/shared/types/graphql';

import type { AssetTable } from '../entities/asset';

import { BaseFilter } from './base.filter';

export class AssetFilter extends BaseFilter<AssetTable> {
  applyFilters(filters: AssetFilters) {
    if (filters.filename) {
      if (filters.filename.contains) {
        this.query.whereRaw(`LOWER(filename) LIKE ?`, [
          `%${filters.filename.contains.toLowerCase()}%`
        ]);
      } else if (filters.filename.equals) {
        this.query.where(`filename`, filters.filename.equals);
      }
    }

    return this;
  }

  applySort() {
    this.query.orderBy('created_at', 'desc');

    return this;
  }
}
