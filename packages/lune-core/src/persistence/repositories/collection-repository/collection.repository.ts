import type { AssetInEntity, CollectionListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection/connection';
import type { Asset } from '@/persistence/entities/asset';
import type { Collection, CollectionTable } from '@/persistence/entities/collection';
import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { CollectionTranslationTable } from '@/persistence/entities/collection-translation';
import type { ID } from '@/persistence/entities/entity';
import type { Product } from '@/persistence/entities/product';
import { CollectionFilter } from '@/persistence/filters/collection.filter';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { CollectionSerializer } from '@/persistence/serializers/collection.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';
import { RepositoryError } from '../repository.error';

export class CollectionRepository extends Repository<Collection, CollectionTable> {
  private assetSerializer: AssetSerializer;

  constructor(trx: Transaction) {
    super(Tables.Collection, trx, new CollectionSerializer());

    this.assetSerializer = new AssetSerializer();
  }

  async findByFilters(input: CollectionListInput) {
    const query = this.q();

    const result = await new CollectionFilter(query)
      .applyFilters(input.filters ?? {})
      .applyPagination(input)
      .applySort()
      .build();

    return result.map(item => this.serializer.deserialize(item) as Collection);
  }

  async countByFilters(filters: CollectionListInput['filters']) {
    try {
      const query = this.q();

      new CollectionFilter(query).applyFilters(filters ?? {});

      const [{ count }] = await query.count({ count: '*' });

      return Number(count);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async findAssets(collectionId: ID): Promise<Asset[]> {
    try {
      const query = this.trx<CollectionAssetTable>(Tables.CollectionAsset)
        .where({ collection_id: collectionId })
        .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.CollectionAsset}.asset_id`)
        .orderBy(`${Tables.CollectionAsset}.order`, 'asc');

      const result = await query;

      return result.map(asset => this.assetSerializer.deserialize(asset) as Asset);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async findProducts(collectionId: ID): Promise<Product[]> {
    try {
      const query = this.trx<CollectionProductTable>(Tables.CollectionProduct)
        .where({ collection_id: collectionId })
        .innerJoin(
          Tables.Product,
          `${Tables.Product}.id`,
          `${Tables.CollectionProduct}.product_id`
        );

      const result = await query;

      return result.map(product => this.assetSerializer.deserialize(product) as Product);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async countDuplicatedSlug(slug: string) {
    try {
      const [{ count }] = await this.q()
        .where(qb => {
          qb.where('slug', slug).orWhere('slug', 'like', `${slug}-%`);
        })
        .count();

      return Number(count);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async upsertAssets(collectionId: ID, assets: AssetInEntity[]) {
    try {
      const result = await this.trx<CollectionAssetTable>(Tables.CollectionAsset)
        .insert(
          assets.map(asset => ({
            asset_id: asset.id,
            collection_id: collectionId,
            order: asset.order
          }))
        )
        .onConflict(['asset_id', 'collection_id'])
        .merge();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async upsertProducts(collectionId: ID, ids: ID[]) {
    try {
      await Promise.all(
        ids.map(id =>
          this.trx<CollectionProductTable>(Tables.CollectionProduct)
            .insert({
              collection_id: collectionId,
              product_id: id
            })
            .onConflict(['product_id', 'collection_id'])
            .merge()
        )
      );
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async addSubCollections(collectionId: ID, ids: ID[]) {
    try {
      await this.trx<CollectionTable>(Tables.Collection)
        .update({ parent_id: collectionId })
        .whereIn('id', ids);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeAssets(collectionId: ID, ids: ID[]) {
    try {
      const result = await this.trx<CollectionAssetTable>(Tables.CollectionAsset)
        .where({ collection_id: collectionId })
        .whereIn('asset_id', ids)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeProducts(collectionId: ID, ids: ID[]) {
    try {
      const result = await this.trx<CollectionProductTable>(Tables.CollectionProduct)
        .where({ collection_id: collectionId })
        .whereIn('product_id', ids)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeSubCollection(ids: ID[]) {
    try {
      const result = await this.trx<CollectionTable>(Tables.Collection)
        .update({ parent_id: null })
        .whereIn('id', ids);

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeAllAssets(collectionIds: ID[]) {
    try {
      const result = await this.trx<CollectionAssetTable>(Tables.CollectionAsset)
        .whereIn('collection_id', collectionIds)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeAllProducts(collectionIds: ID[]) {
    try {
      const result = await this.trx<CollectionProductTable>(Tables.CollectionProduct)
        .whereIn('collection_id', collectionIds)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeAllTranslations(collectionIds: ID[]) {
    try {
      const result = await this.trx<CollectionTranslationTable>(Tables.CollectionTranslation)
        .whereIn('collection_id', collectionIds)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }
}
