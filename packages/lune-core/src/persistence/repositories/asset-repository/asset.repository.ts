import type { AssetFilters, AssetListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection/connection';
import type { Asset, AssetTable } from '@/persistence/entities/asset';
import { AssetFilter } from '@/persistence/filters/asset.filter';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class AssetRepository extends Repository<Asset, AssetTable> {
  constructor(trx: Transaction) {
    super(Tables.Asset, trx, new AssetSerializer());
  }

  async findByFilters(input?: AssetListInput) {
    const query = this.q();

    const result = await new AssetFilter(query)
      .applyPagination(input ?? {})
      .applyFilters(input?.filters ?? {})
      .applySort()
      .build();

    return result.map(asset => this.serializer.deserialize(asset) as Asset);
  }

  async countByFilters(filters?: AssetFilters) {
    const query = this.q();

    new AssetFilter(query).applyFilters(filters ?? {});

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }
}
