import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Asset, AssetTable } from '@/persistence/entities/asset';
import type { ID } from '@/persistence/entities/entity';
import type { VariantAssetTable } from '@/persistence/entities/variant-asset';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { Tables } from '@/persistence/tables';

export function createVariantAssetsLoader(trx: Transaction) {
  const assetSerializer = new AssetSerializer();

  return new DataLoader<string, Asset[]>(async variantIds => {
    const ids = variantIds as ID[];

    const rows: (AssetTable & VariantAssetTable)[] = await trx
      .from({ va: Tables.VariantAsset })
      .innerJoin({ a: Tables.Asset }, 'a.id', 'va.asset_id')
      .select('va.variant_id', 'va.order', trx.ref('a.*'))
      .whereIn('va.variant_id', ids)
      .orderBy([{ column: 'va.order', order: 'asc' }]);

    const byId = new Map<string, Asset[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { variant_id, order, ...assetCols } = r;

      byId
        .get(variant_id)
        ?.push({ ...assetSerializer.deserialize(assetCols as AssetTable), order } as Asset);
    }

    return ids.map(id => byId.get(id) as Asset[]);
  });
}
