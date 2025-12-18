import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Asset, AssetTable } from '@/persistence/entities/asset';
import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { Tables } from '@/persistence/tables';

export function createProductAssetsLoader(trx: Transaction) {
  const assetSerializer = new AssetSerializer();

  return new DataLoader<string, Asset[]>(async productIds => {
    const ids = productIds as string[];

    const rows: (AssetTable & ProductAssetTable)[] = await trx
      .from({ pa: Tables.ProductAsset })
      .innerJoin({ a: Tables.Asset }, 'a.id', 'pa.asset_id')
      .select('pa.product_id', 'pa.order', trx.ref('a.*'))
      .whereIn('pa.product_id', ids)
      .orderBy([{ column: 'pa.order', order: 'asc' }]);

    const byId = new Map<string, Asset[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { product_id, order, ...assetCols } = r;
      byId
        .get(product_id)
        ?.push({ ...assetSerializer.deserialize(assetCols as AssetTable), order } as Asset);
    }

    return ids.map(id => byId.get(id) as Asset[]);
  });
}
