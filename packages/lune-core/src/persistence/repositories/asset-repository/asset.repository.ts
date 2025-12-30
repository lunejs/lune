import type { AssetFilters, AssetListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection/connection';
import type { Asset, AssetTable } from '@/persistence/entities/asset';
import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';
import type { ID } from '@/persistence/entities/entity';
import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import type { VariantAssetTable } from '@/persistence/entities/variant-asset';
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

  async removeAllFromProduct(assetIds: ID[]) {
    const result = await this.trx<ProductAssetTable>(Tables.ProductAsset)
      .whereIn('asset_id', assetIds)
      .del();

    return result;
  }

  async removeAllFromCollection(assetIds: ID[]) {
    const result = await this.trx<CollectionAssetTable>(Tables.CollectionAsset)
      .whereIn('asset_id', assetIds)
      .del();

    return result;
  }

  async removeAllFromVariant(assetIds: ID[]) {
    const result = await this.trx<VariantAssetTable>(Tables.VariantAsset)
      .whereIn('asset_id', assetIds)
      .del();

    return result;
  }
}
