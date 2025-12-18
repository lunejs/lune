import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Asset, AssetTable } from '@/persistence/entities/asset';
import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { Tables } from '@/persistence/tables';

export function createCollectionAssetsLoader(trx: Transaction) {
  const assetSerializer = new AssetSerializer();

  return new DataLoader<string, Asset[]>(async collectionIds => {
    const ids = collectionIds as string[];

    const rows: (AssetTable & CollectionAssetTable)[] = await trx
      .from({ ca: Tables.CollectionAsset })
      .innerJoin({ a: Tables.Asset }, 'a.id', 'ca.asset_id')
      .select('ca.collection_id', 'ca.order', trx.ref('a.*'))
      .whereIn('ca.collection_id', ids)
      .orderBy([{ column: 'ca.order', order: 'asc' }]);

    const byId = new Map<string, Asset[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { collection_id, order, ...assetCols } = r;
      byId
        .get(collection_id)
        ?.push({ ...assetSerializer.deserialize(assetCols as AssetTable), order } as Asset);
    }

    return ids.map(id => byId.get(id) as Asset[]);
  });
}
