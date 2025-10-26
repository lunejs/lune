import { clean, isArray } from '@vendyx/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { UpdateCollectionInput } from '@/api/shared/types/graphql';
import { type CollectionListInput, type CreateCollectionInput } from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import { type Collection, CollectionContentType } from '@/persistence/entities/collection';
import type { ID } from '@/persistence/entities/entity';
import type { CollectionRepository } from '@/persistence/repositories/collection-repository/collection.repository';
import type { Where } from '@/persistence/repositories/repository';

export class CollectionService {
  private repository: CollectionRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.collection;
  }

  async find(input?: CollectionListInput) {
    return this.repository.findByFilters(input ?? {});
  }

  async count(input?: CollectionListInput['filters']) {
    return this.repository.countByFilters(input ?? {});
  }

  async findUnique(id?: ID, slug?: string, options?: Where<Collection>) {
    if (id) return this.repository.findOne({ where: { id, ...options } });
    if (slug) return this.repository.findOne({ where: { slug, ...options } });

    return null;
  }

  async create(input: CreateCollectionInput) {
    const slug = await this.validateAndParseSlug(input.name);
    const collectionCount = await this.repository.count();

    const { assets, products, subCollections, ...baseCollection } = input;

    const collection = await this.repository.create({
      ...clean(baseCollection),
      slug,
      enabled: input.enabled ?? true,
      order: input.order ?? collectionCount + 1,
      contentType:
        (input.contentType as unknown as CollectionContentType) ?? CollectionContentType.Products
    });

    if (assets?.length) {
      await this.repository.upsertAssets(collection.id, assets);
    }

    if (products?.length && collection.contentType === CollectionContentType.Products) {
      await this.repository.upsertProducts(collection.id, products);
    }

    if (subCollections?.length && collection.contentType === CollectionContentType.Collections) {
      await this.repository.addSubCollections(collection.id, subCollections);
    }

    return collection;
  }

  async update(id: ID, input: UpdateCollectionInput) {
    const { assets, products, subCollections, ...baseCollection } = input;

    const result = await this.repository.update({
      where: { id },
      data: clean(baseCollection)
    });

    if (assets?.length) {
      await this.repository.upsertAssets(id, assets);
    }

    if (products?.length) {
      await this.repository.upsertProducts(id, products);
    }

    if (subCollections?.length) {
      await this.addNewSubCollections(id, subCollections);
    }

    await this.removeMissingSubCollection(id, subCollections);
    await this.removeMissingAssets(id, assets);
    await this.removeMissingProducts(id, products);

    return result;
  }

  async remove(ids: ID[]) {
    await Promise.all([
      this.repository.removeAllAssets(ids),
      this.repository.removeAllProducts(ids),
      this.repository.removeAllTranslations(ids),
      this.repository.removeMany({ whereIn: 'id', values: ids })
    ]);

    return true;
  }

  private async addNewSubCollections(collectionId: ID, newSubCollections: string[]) {
    const { contentType } = (await this.repository.findOne({
      where: { id: collectionId },
      fields: ['contentType']
    })) as Collection;

    if (contentType === CollectionContentType.Products) return;

    const subCollections = await this.repository.findMany({ where: { parentId: collectionId } });
    console.log({ subCollections });

    const subCollectionsToAdd = newSubCollections.filter(
      subCollection => !subCollections.map(s => s.id).includes(subCollection)
    );

    await this.repository.addSubCollections(collectionId, subCollectionsToAdd);
  }

  private async removeMissingSubCollection(
    collectionId: ID,
    newSubCollections: UpdateCollectionInput['subCollections']
  ) {
    if (!isArray(newSubCollections)) return;

    const subCollections = await this.repository.findMany({ where: { parentId: collectionId } });

    const subCollectionsToRemove = subCollections
      .map(subCollection => subCollection.id)
      .filter(subCollection => !newSubCollections?.includes(subCollection));

    await this.repository.removeSubCollection(subCollectionsToRemove);
  }

  private async removeMissingAssets(collectionId: ID, newAssets: UpdateCollectionInput['assets']) {
    if (!isArray(newAssets)) return;

    const assets = await this.repository.findAssets(collectionId);

    const assetsToRemove = assets
      .map(a => a.id)
      .filter(assetId => !newAssets.some(asset => asset.id === assetId));

    await this.repository.removeAssets(collectionId, assetsToRemove);
  }

  private async removeMissingProducts(
    collectionId: ID,
    newProducts: UpdateCollectionInput['products']
  ) {
    if (!isArray(newProducts)) return;

    const products = await this.repository.findProducts(collectionId);

    const productsToRemove = products
      .map(a => a.id)
      .filter(productId => !newProducts.some(id => id === productId));

    await this.repository.removeProducts(collectionId, productsToRemove);
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.repository.countDuplicatedSlug(slug);

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }
}
