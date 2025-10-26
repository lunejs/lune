import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { CollectionConstants } from './collection.fixtures';
import { ProductConstants } from './product.fixtures';

export class CollectionProductFixtures implements Fixture<CollectionProductTable> {
  table: Tables = Tables.CollectionProduct;

  async build(): Promise<Partial<CollectionProductTable>[]> {
    return [
      {
        product_id: ProductConstants.AirPodsPro2ndGenID,
        collection_id: CollectionConstants.EllieCollection
      },
      {
        product_id: ProductConstants.AppleWatchSeries8ID,
        collection_id: CollectionConstants.EllieCollection
      },
      {
        product_id: ProductConstants.MacBookPro16ID,
        collection_id: CollectionConstants.EllieCollection
      },
      {
        product_id: ProductConstants.iPhone14ProMaxID,
        collection_id: CollectionConstants.EllieCollection
      },
      {
        product_id: ProductConstants.BeachShirtID,
        collection_id: CollectionConstants.JoelCollection
      },
      {
        product_id: ProductConstants.JacketID,
        collection_id: CollectionConstants.JoelCollection
      },
      {
        product_id: ProductConstants.JeansID,
        collection_id: CollectionConstants.JoelCollection
      },
      {
        product_id: ProductConstants.ShirtID,
        collection_id: CollectionConstants.JoelCollection
      },
      {
        product_id: ProductConstants.SneakersID,
        collection_id: CollectionConstants.JoelCollection
      }
    ];
  }
}
