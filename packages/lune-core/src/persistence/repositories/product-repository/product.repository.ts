import type { ListInput, ProductListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { Asset } from '@/persistence/entities/asset';
import type { CollectionProductTable } from '@/persistence/entities/collection-product';
import type { ID } from '@/persistence/entities/entity';
import type { OptionTable } from '@/persistence/entities/option';
import type { Product, ProductTable } from '@/persistence/entities/product';
import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import type { ProductTagTable } from '@/persistence/entities/product-tag';
import type { ProductTranslationTable } from '@/persistence/entities/product-translation';
import type { Tag, TagTable } from '@/persistence/entities/tag';
import { ProductFilter } from '@/persistence/filters/product.filter';
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

    const result = await new ProductFilter(query)
      .applyFilters(input.filters ?? {})
      .applySort(input.sort ?? {})
      .applyPagination(input)
      .build();

    return result.map(item => this.serializer.deserialize(item) as Product);
  }

  async countByFilters(filters: ProductListInput['filters']) {
    const query = this.q();

    this.applyDeletedAtClause(query);

    new ProductFilter(query).applyFilters(filters ?? {});

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
      throw new RepositoryError(error);
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
      throw new RepositoryError(error);
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
      throw new RepositoryError(error);
    }
  }

  async removeTags(ids: ID[]) {
    try {
      const result = await this.trx<ProductTagTable>(Tables.ProductTag)
        .whereIn('tag_id', ids)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
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
      throw new RepositoryError(error);
    }
  }

  async countAssets(product: ID): Promise<number> {
    try {
      const result = await this.trx<ProductAssetTable>(Tables.ProductAsset)
        .where({ product_id: product })
        .count({ count: '*' });

      return Number(result[0].count);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async findTags(product: ID): Promise<Tag[]> {
    try {
      const result: TagTable[] = await this.trx<ProductTagTable>(Tables.ProductTag)
        .where({ product_id: product })
        .innerJoin(Tables.Tag, `${Tables.Tag}.id`, `${Tables.ProductTag}.tag_id`);

      return result.map(tag => this.tagSerializer.deserialize(tag) as Tag);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async findAssetsByProductIds(ids: ID[]): Promise<Asset[]> {
    try {
      const result = await this.trx<ProductAssetTable>(Tables.ProductAsset)
        .whereIn('product_id', ids)
        .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.ProductAsset}.asset_id`);

      return result.map(asset => this.assetSerializer.deserialize(asset) as Asset);
    } catch (error) {
      throw new RepositoryError(error);
    }
  }

  async removeAllOptions(productIds: ID[]) {
    const optionsToDelete = await this.trx<OptionTable>(Tables.Option).whereIn(
      'product_id',
      productIds
    );

    const optionIds = optionsToDelete.map(o => o.id);

    if (optionIds.length === 0) return;

    await this.trx(Tables.VariantOptionValue)
      .whereIn('option_value_id', function () {
        this.select('id').from(Tables.OptionValue).whereIn('option_id', optionIds);
      })
      .del();

    await this.trx(Tables.OptionValue).whereIn('option_id', optionIds).del();

    await this.trx(Tables.Option).whereIn('id', optionIds).del();
  }

  async removeAllAssets(productIds: ID[]) {
    await this.trx<ProductAssetTable>(Tables.ProductAsset).whereIn('product_id', productIds).del();
  }

  async removeAllCollections(productIds: ID[]) {
    await this.trx<CollectionProductTable>(Tables.CollectionProduct)
      .whereIn('product_id', productIds)
      .del();
  }

  async removeAllTags(productIds: ID[]) {
    await this.trx<ProductTagTable>(Tables.ProductTag).whereIn('product_id', productIds).del();
  }

  async removeAllTranslations(productIds: ID[]) {
    await this.trx<ProductTranslationTable>(Tables.ProductTranslation)
      .whereIn('product_id', productIds)
      .del();
  }

  async countDuplicatedSlug(slug: string) {
    const [{ count }] = await this.q()
      .where(qb => {
        qb.where('slug', slug).orWhere('slug', 'like', `${slug}-%`);
      })
      .count();

    return Number(count);
  }
}

type UpsertAssetInput = {
  id: ID;
  order: number;
};
