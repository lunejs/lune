import type { Knex } from 'knex';

import { convertToCent } from '@vendyx/common';

import type { ListInput, ProductListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { Asset } from '@/persistence/entities/asset';
import type { ID } from '@/persistence/entities/entity';
import type { Product, ProductTable } from '@/persistence/entities/product';
import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import type { ProductOptionTable } from '@/persistence/entities/product-option';
import type { ProductTagTable } from '@/persistence/entities/product-tag';
import type { ProductTranslationTable } from '@/persistence/entities/product-translation';
import type { Tag, TagTable } from '@/persistence/entities/tag';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { ProductSerializer } from '@/persistence/serializers/product.serializer';
import { TagSerializer } from '@/persistence/serializers/tag.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';
import { RepositoryError } from '../repository.error';

export class ProductRepository extends Repository<Product, ProductTable> {
  private assetSerializer: AssetSerializer;
  private tagSerializer: TagSerializer;

  constructor(trx: Transaction) {
    super(Tables.Product, trx, new ProductSerializer());

    this.assetSerializer = new AssetSerializer();
    this.tagSerializer = new TagSerializer();
  }

  async findByFilters(input: ProductListInput) {
    const query = this.q();

    this.applyDeletedAtClause(query);

    this.applyFilters(query, input.filters);

    if (input.sort?.createdAt) query.orderBy('created_at', this.toOrder(input.sort.createdAt));
    if (input.sort?.name) query.orderBy('name', this.toOrder(input.sort.name));
    if (input.sort?.salePrice) query.orderBy('min_sale_price', this.toOrder(input.sort.salePrice));

    if (input.take) query.limit(input.take);
    if (input.skip) query.offset(input.skip);

    const result = await query;
    return result.map(item => this.serializer.deserialize(item) as Product);
  }

  async countByFilters(filters: ProductListInput['filters']) {
    const query = this.q();

    this.applyDeletedAtClause(query);

    this.applyFilters(query, filters);

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }

  async upsertAssets(productId: ID, assets: UpsertAssetInput[]) {
    try {
      const result = await this.trx<ProductAssetTable>(Tables.ProductAsset)
        .insert(
          assets.map(asset => ({
            asset_id: asset.id,
            product_id: productId,
            order: asset.order
          }))
        )
        .onConflict(['asset_id', 'product_id'])
        .merge();

      return result;
    } catch (error) {
      throw new RepositoryError('ProductRepository.createAssets', error);
    }
  }

  async removeAssets(productId: ID, ids: ID[]) {
    try {
      const result = await this.trx<ProductAssetTable>(Tables.ProductAsset)
        .where({ product_id: productId })
        .whereIn('asset_id', ids)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError('ProductRepository.removeAssets', error);
    }
  }

  async upsertTags(productId: ID, tags: ID[]) {
    try {
      const result = await this.trx<ProductTagTable>(Tables.ProductTag)
        .insert(tags.map(tagId => ({ tag_id: tagId, product_id: productId })))
        .onConflict(['tag_id', 'product_id'])
        .merge();

      return result;
    } catch (error) {
      throw new RepositoryError('ProductRepository.upsertTags', error);
    }
  }

  async removeTags(ids: ID[]) {
    try {
      const result = await this.trx<ProductTagTable>(Tables.ProductTag)
        .whereIn('tag_id', ids)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError('ProductRepository.removeTags', error);
    }
  }

  async findAssets(product: ID, input?: ListInput): Promise<Asset[]> {
    try {
      const query = this.trx<ProductAssetTable>(Tables.ProductAsset)
        .where({ product_id: product })
        .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.ProductAsset}.asset_id`)
        .orderBy(`${Tables.ProductAsset}.order`, 'asc');

      if (input?.take) query.limit(input.take);
      if (input?.skip) query.offset(input.skip);

      const result = await query;

      return result.map(asset => this.assetSerializer.deserialize(asset) as Asset);
    } catch (error) {
      throw new RepositoryError('ProductRepository.findAssets', error);
    }
  }

  async countAssets(product: ID): Promise<number> {
    try {
      const result = await this.trx<ProductAssetTable>(Tables.ProductAsset)
        .where({ product_id: product })
        .count({ count: '*' });

      return Number(result[0].count);
    } catch (error) {
      throw new RepositoryError('ProductRepository.countAssets', error);
    }
  }

  async findTags(product: ID): Promise<Tag[]> {
    try {
      const result: TagTable[] = await this.trx<ProductTagTable>(Tables.ProductTag)
        .where({ product_id: product })
        .innerJoin(Tables.Tag, `${Tables.Tag}.id`, `${Tables.ProductTag}.tag_id`);

      return result.map(tag => this.tagSerializer.deserialize(tag) as Tag);
    } catch (error) {
      throw new RepositoryError('ProductRepository.findTags', error);
    }
  }

  async findAssetsByProductIds(ids: ID[]): Promise<Asset[]> {
    try {
      const result = await this.trx<ProductAssetTable>(Tables.ProductAsset)
        .whereIn('product_id', ids)
        .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.ProductAsset}.asset_id`);

      return result.map(asset => this.assetSerializer.deserialize(asset) as Asset);
    } catch (error) {
      throw new RepositoryError('ProductRepository.findAssets', error);
    }
  }

  async removeAllOptions(productIds: ID[]) {
    const optionsToDelete = await this.trx(Tables.ProductOption)
      .select('option_id')
      .whereIn('product_id', productIds);

    const optionIds = optionsToDelete.map(o => o.option_id);

    if (optionIds.length === 0) return;

    await this.trx(Tables.VariantOptionValue)
      .whereIn('option_value_id', function () {
        this.select('id').from(Tables.OptionValue).whereIn('option_id', optionIds);
      })
      .del();

    await this.trx(Tables.OptionValue).whereIn('option_id', optionIds).del();

    await this.trx(Tables.ProductOption).whereIn('product_id', productIds).del();

    await this.trx(Tables.Option).whereIn('id', optionIds).del();
  }

  async removeAllAssets(productIds: ID[]) {
    await this.trx<ProductAssetTable>(Tables.ProductAsset).whereIn('product_id', productIds).del();
  }

  async removeAllTags(productIds: ID[]) {
    await this.trx<ProductTagTable>(Tables.ProductTag).whereIn('product_id', productIds).del();
  }

  async removeAllTranslations(productIds: ID[]) {
    await this.trx<ProductTranslationTable>(Tables.ProductTranslation)
      .whereIn('product_id', productIds)
      .del();
  }

  async addOptions(productId: ID, ids: ID[]) {
    await Promise.all(
      ids.map(id =>
        this.trx<ProductOptionTable>(Tables.ProductOption).insert({
          product_id: productId,
          option_id: id
        })
      )
    );
  }

  async countDuplicatedSlug(slug: string) {
    const [{ count }] = await this.q()
      .where(qb => {
        qb.where('slug', slug).orWhere('slug', 'like', `${slug}-%`);
      })
      .count();

    return Number(count);
  }

  // TODO: Accept a list of tags instead a unique tag for filter
  private applyFilters(
    query: Knex.QueryBuilder<ProductTable, any[]>,
    filters?: ProductListInput['filters']
  ) {
    if (filters?.name) {
      if (filters.name.contains) {
        query.whereRaw('LOWER(name) LIKE ?', `%${filters.name.contains.toLowerCase()}%`);
      } else if (filters.name.equals) {
        query.where('name', filters.name.equals);
      }
    }

    if (filters?.enabled !== undefined) query.where('enabled', filters.enabled?.equals);
    if (filters?.archived !== undefined) {
      query.where('archived', filters.archived?.equals);
    } else {
      query.where('archived', false);
    }

    if (filters?.tag) {
      query.whereExists(function () {
        this.select('*')
          .from(Tables.ProductTag)
          .innerJoin(Tables.Tag, `${Tables.Tag}.id`, `${Tables.ProductTag}.tag_id`)
          .whereRaw(`${Tables.ProductTag}.product_id = ${Tables.Product}.id`)
          .andWhere(`${Tables.Tag}.name`, filters?.tag);
      });
    }

    if (filters?.salePriceRange?.min) {
      query.where('min_sale_price', '>=', convertToCent(filters.salePriceRange.min));
    }

    if (filters?.salePriceRange?.max) {
      query.where('max_sale_price', '<=', convertToCent(filters.salePriceRange.max));
    }

    if (filters?.optionValues?.length) {
      for (const opv of filters.optionValues) {
        query.whereExists(function () {
          this.select('*')
            .from(Tables.Variant)
            .innerJoin(
              `${Tables.VariantOptionValue} as vov`,
              'vov.variant_id',
              `${Tables.Variant}.id`
            )
            .innerJoin(`${Tables.OptionValue} as ov`, 'ov.id', 'vov.option_value_id')
            .innerJoin(`${Tables.Option} as o`, 'o.id', 'ov.option_id')
            .whereRaw(`${Tables.Variant}.product_id = ${Tables.Product}.id`)
            .andWhereILike('o.name', opv.option)
            .whereIn('ov.name', opv.values);
        });
      }
    }
  }
}

type UpsertAssetInput = {
  id: ID;
  order: number;
};
