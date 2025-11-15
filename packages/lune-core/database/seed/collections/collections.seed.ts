import type { Knex } from 'knex';

import { LuneLogger } from '@/logger/lune.logger';
import { Tables } from '@/persistence/tables';
import type { CollectionTable } from '@/persistence/entities/collection';
import { CollectionContentType } from '@/persistence/entities/collection';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { ProductTable } from '@/persistence/entities/product';
import type { SeedContext } from '../seed.types';

import Collections from './collections.json';

const TIMESTAMP_OFFSET_SECONDS = 30;

export async function seedCollections(trx: Knex.Transaction, ctx: SeedContext) {
  let timestampOffset = 0;

  const getTimestamp = () => {
    const timestamp = new Date(Date.now() - timestampOffset * 1000);
    timestampOffset += TIMESTAMP_OFFSET_SECONDS;
    return timestamp;
  };

  for (const collection of Collections) {
    // 1. Create collection
    const collectionTimestamp = getTimestamp();
    const [collectionCreated] = await trx<CollectionTable>(Tables.Collection)
      .insert({
        name: collection.name,
        slug: collection.slug,
        description: collection.description,
        enabled: collection.enabled,
        content_type: CollectionContentType.Products,
        order: collection.order,
        shop_id: ctx.shopId,
        created_at: collectionTimestamp,
        updated_at: collectionTimestamp
      })
      .returning('id');

    // 2. Get all products from this shop to add to the collection
    const products = await trx<ProductTable>(Tables.Product)
      .where({ shop_id: ctx.shopId })
      .select('id');

    // 3. Add all products to the collection
    if (products.length > 0) {
      await trx<CollectionProductTable>(Tables.CollectionProduct).insert(
        products.map(product => ({
          collection_id: collectionCreated.id,
          product_id: product.id
        }))
      );
    }
  }

  LuneLogger.info(`Collections inserted: ${Collections.length}`);
}
