import type { ExecutionContext } from '@/api/shared/context/types';
import {
  CollectionContentType as ApiCollectionContentType,
  type CollectionListInput,
  type CreateCollectionInput
} from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import { CollectionContentType, type Collection } from '@/persistence/entities/collection';
import type { ID } from '@/persistence/entities/entity';
import type { CollectionRepository } from '@/persistence/repositories/collection-repository/collection.repository';
import type { Where } from '@/persistence/repositories/repository';
import { clean } from '@vendyx/common';

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

    if (products?.length && input.contentType === ApiCollectionContentType.Products) {
      await this.repository.addProducts(collection.id, products);
    }

    if (subCollections?.length && input.contentType === ApiCollectionContentType.Collections) {
      await this.repository.addProducts(collection.id, subCollections);
    }

    return collection;
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.repository.countDuplicatedSlug(slug);

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }
}
