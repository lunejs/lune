// loaders/product-tags.loader.ts
import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { ProductTagTable } from '@/persistence/entities/product-tag';
import type { Tag, TagTable } from '@/persistence/entities/tag';
import { TagSerializer } from '@/persistence/serializers/tag.serializer';
import { Tables } from '@/persistence/tables';

export function createProductTagsLoader(trx: Transaction) {
  return new DataLoader<string, Tag[]>(async productIds => {
    const rows = await trx
      .from({ pt: Tables.ProductTag })
      .innerJoin({ t: Tables.Tag }, 't.id', 'pt.tag_id')
      .select('pt.product_id', trx.ref('t.*'))
      .whereIn('pt.product_id', productIds)
      .orderBy('t.created_at', 'asc');

    const tagSerializer = new TagSerializer();

    const byProductId = new Map<string, Tag[]>();
    for (const id of productIds) byProductId.set(id, []);

    for (const r of rows as (TagTable & ProductTagTable)[]) {
      const { product_id, ...tagCols } = r;
      const tag = tagSerializer.deserialize(tagCols as TagTable) as Tag;
      byProductId.get(product_id)?.push(tag);
    }

    return (productIds as string[]).map(id => byProductId.get(id) ?? []);
  });
}
