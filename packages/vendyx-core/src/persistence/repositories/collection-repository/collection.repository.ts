import type { Knex } from 'knex';

import type { AssetInEntity, CollectionListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { Asset } from '@/persistence/entities/asset';
import type { Collection, CollectionTable } from '@/persistence/entities/collection';
import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { ID } from '@/persistence/entities/entity';
import type { Product } from '@/persistence/entities/product';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { CollectionSerializer } from '@/persistence/serializers/collection.serializer';
import type { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';
import { RepositoryError } from '../repository.error';

export class CollectionRepository extends Repository<Collection, CollectionTable> {
  private assetSerializer: AssetSerializer;
  private productSerializer: ProductSerializer;

  constructor(trx: Transaction) {
    super(Tables.Collection, trx, new CollectionSerializer());

    this.assetSerializer = new AssetSerializer();
  }

  async findByFilters(input: CollectionListInput) {
    const query = this.q();

    this.applyFilters(query, input.filters);

    if (input.take) query.limit(input.take);
    if (input.skip) query.offset(input.skip);

    query.orderBy('created_at', 'desc');

    const result = await query;
    return result.map(item => this.serializer.deserialize(item) as Collection);
  }

  async countByFilters(filters: CollectionListInput['filters']) {
    const query = this.q();

    this.applyFilters(query, filters);

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }

  async countDuplicatedSlug(slug: string) {
    const [{ count }] = await this.q()
      .where(qb => {
        qb.where('slug', slug).orWhere('slug', 'like', `${slug}-%`);
      })
      .count();

    return Number(count);
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
      throw new RepositoryError('CollectionRepository.upsertAsset', error);
    }
  }

  async upsertProducts(collectionId: ID, ids: ID[]) {
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
  }

  async addSubCollections(collectionId: ID, ids: ID[]) {
    await this.trx<CollectionTable>(Tables.Collection)
      .update({ parent_id: collectionId })
      .whereIn('id', ids);
  }

  async removeAssets(collectionId: ID, ids: ID[]) {
    try {
      const result = await this.trx<CollectionAssetTable>(Tables.CollectionAsset)
        .where({ collection_id: collectionId })
        .whereIn('asset_id', ids)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError('CollectionRepository.removeAssets', error);
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
      throw new RepositoryError('CollectionRepository.removeProducts', error);
    }
  }

  async removeSubCollection(ids: ID[]) {
    try {
      const result = await this.trx<CollectionTable>(Tables.Collection)
        .update({ parent_id: null })
        .whereIn('id', ids);

      return result;
    } catch (error) {
      throw new RepositoryError('CollectionRepository.removeAssets', error);
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
      throw new RepositoryError('CollectionRepository.findAssets', error);
    }
  }

  async findProducts(collectionId: ID): Promise<Product[]> {
    try {
      const query = this.trx<CollectionProductTable>(Tables.CollectionProduct)
        .where({ collection_id: collectionId })
        .innerJoin(Tables.Product, `${Tables.Product}.id`, `${Tables.Product}.product_id`);

      const result = await query;

      return result.map(product => this.assetSerializer.deserialize(product) as Product);
    } catch (error) {
      throw new RepositoryError('CollectionRepository.findAssets', error);
    }
  }

  private applyFilters(
    query: Knex.QueryBuilder<CollectionTable, any[]>,
    filters?: CollectionListInput['filters']
  ) {
    if (filters?.name) {
      if (filters.name.contains) {
        query.whereRaw('LOWER(name) LIKE ?', `%${filters.name.contains.toLowerCase()}%`);
      } else if (filters.name.equals) {
        query.where('name', filters.name.equals);
      }
    }

    if (filters?.enabled !== undefined) query.where('enabled', filters.enabled?.equals);

    if (filters?.contentType) {
      query.where('content_type', filters.contentType);
    } else {
      query.whereNull('parent_id');
    }
  }
}
