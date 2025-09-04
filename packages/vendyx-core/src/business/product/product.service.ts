import { ExecutionContext } from '@/api/shared/context/types';
import {
  CreateProductInput,
  OrderBy,
  ProductListInput,
  UpdateProductInput
} from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import { ID } from '@/persistence/entities/entity';
import { Product } from '@/persistence/entities/product';
import { ProductRepository } from '@/persistence/repositories/product-repository';
import { Where } from '@/persistence/repositories/repository';
import { hasValue } from '@/utils/array';

import { clean } from '../../../../vendyx-common/dist/index.cjs';

export class ProductService {
  private repository: ProductRepository;

  constructor(private ctx: ExecutionContext) {
    this.repository = ctx.repositories.product;
  }

  async find(input?: ProductListInput) {
    return this.repository.findByFilters({
      ...input,
      sort: input?.sort ?? { createdAt: OrderBy.Desc }
    });
  }

  async count(input?: ProductListInput['filters']) {
    return this.repository.countByFilters(input ?? {});
  }

  async findUnique(id?: ID, slug?: string, options?: Where<Product>) {
    if (id) return this.repository.findOne({ where: { id, ...options } });
    if (slug) return this.repository.findOne({ where: { slug, ...options } });

    return null;
  }

  async create(input: CreateProductInput) {
    const slug = await this.validateAndParseSlug(input.name);

    const { assets, tags, ...baseProduct } = input;

    const product = await this.repository.create({
      ...clean(baseProduct),
      maxSalePrice: 0,
      minSalePrice: 0,
      enabled: input.enabled ?? true,
      archived: false,
      slug
    });

    if (assets?.length) {
      await this.repository.upsertAssets(product.id, assets);
    }

    if (tags?.length) {
      await this.repository.upsertTags(product.id, tags);
    }

    return product;
  }

  async update(id: ID, input: UpdateProductInput) {
    const { assets, tags, ...baseProduct } = input;

    const result = await this.repository.update({ where: { id }, data: clean(baseProduct) });

    if (assets?.length) {
      await this.repository.upsertAssets(id, assets);
    }

    if (tags?.length) {
      await this.repository.upsertTags(id, tags);
    }

    await this.removeMissingAssets(id, assets);
    await this.removeMissingTags(id, tags);

    return result;
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.repository.count({ where: { name } });

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }

  private async removeMissingAssets(productId: ID, newAssets: UpdateProductInput['assets']) {
    if (!Array.isArray(newAssets)) return;

    const assets = await this.repository.findAssets(productId);

    const assetsToRemove = assets
      .map(a => a.id)
      .filter(assetId => !newAssets.some(asset => asset.id === assetId))
      .map(assetToRemoveId => assets.find(a => a.id === assetToRemoveId))
      .filter(hasValue);

    await this.repository.removeAssets(
      productId,
      assetsToRemove.map(asset => asset.id)
    );
  }

  private async removeMissingTags(productId: ID, newTags: UpdateProductInput['tags']) {
    if (!Array.isArray(newTags)) return;

    const tags = await this.repository.findTags(productId);

    const tagsToRemove = tags
      .map(t => t.id)
      .filter(tagId => !newTags.some(tag => tag === tagId))
      .map(tagToRemoveId => tags.find(t => t.id === tagToRemoveId))
      .filter(hasValue);

    await this.repository.removeTags(tagsToRemove.map(tag => tag.id));
  }
}
