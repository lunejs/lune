import { ExecutionContext } from '@/api/shared/context/types';
import { CreateProductInput, OrderBy, ProductListInput } from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import { ID } from '@/persistence/entities/entity';
import { Product } from '@/persistence/entities/product';
import { AssetRepository } from '@/persistence/repositories/asset-repository/asset.repository';
import { ProductRepository } from '@/persistence/repositories/product-repository';
import { Where } from '@/persistence/repositories/repository';
import { clean } from '@vendyx/common';

export class ProductService {
  private repository: ProductRepository;
  private assetRepository: AssetRepository;

  constructor(private ctx: ExecutionContext) {
    this.repository = ctx.repositories.product;
    this.assetRepository = ctx.repositories.asset;
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
      await this.repository.createAssets(
        assets.map(asset => ({ assetId: asset.id, productId: product.id, order: asset.order }))
      );
    }

    if (tags?.length) {
      await this.repository.createTags(tags.map(tagId => ({ tagId, productId: product.id })));
    }
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.repository.count({ where: { name } });

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }
}
