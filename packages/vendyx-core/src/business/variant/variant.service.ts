import { clean, convertToCent } from '@vendyx/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateVariantInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { ProductRepository } from '@/persistence/repositories/product-repository';
import { SortKey } from '@/persistence/repositories/repository';
import type { VariantRepository } from '@/persistence/repositories/variant-repository';

export class VariantService {
  repository: VariantRepository;
  productRepository: ProductRepository;

  constructor(private ctx: ExecutionContext) {
    this.repository = ctx.repositories.variant;
  }

  async create(productId: ID, input: CreateVariantInput[]) {
    const variantsPromise = input.map(async (v, i) => {
      const now = new Date();

      const variant = await this.repository.create({
        ...clean(v),
        createdAt: new Date(now.setMilliseconds(now.getMilliseconds() + i)),
        salePrice: convertToCent(v.salePrice),
        comparisonPrice: v.comparisonPrice ? convertToCent(v.comparisonPrice) : v.comparisonPrice,
        costPerUnit: v.costPerUnit ? convertToCent(v.costPerUnit) : v.costPerUnit,
        stock: v.stock ?? 0,
        requiresShipping: v.requiresShipping ?? false,
        productId
      });

      if (v.assets?.length) {
        await this.repository.upsertAssets(variant.id, v.assets);
      }

      if (v.optionValues?.length) {
        await this.repository.upsertOptionValues(variant.id, v.optionValues);
      }

      return variant;
    });

    const variants = await Promise.all(variantsPromise);

    await this.updateProductRangePrice({ productId });

    return variants;
  }

  private async updateProductRangePrice({ variantId, productId }: UpdateProductRangePriceInput) {
    if (!productId && !variantId) {
      return null;
    }

    const resolvedProductId = productId ?? (await this.getProductIdFromVariant(variantId as ID));

    const [minSalePriceVariant, maxSalePriceVariant] = await Promise.all([
      this.findSalePriceLimit(resolvedProductId, SortKey.Asc),
      this.findSalePriceLimit(resolvedProductId, SortKey.Desc)
    ]);

    await this.productRepository.update({
      where: { id: productId },
      data: {
        minSalePrice: minSalePriceVariant?.salePrice ?? 0,
        maxSalePrice: maxSalePriceVariant?.salePrice ?? 0
      }
    });
  }

  private async getProductIdFromVariant(variantId: ID) {
    const productFromVariant = await this.repository.findOne({
      where: { id: variantId },
      fields: ['productId']
    });

    return productFromVariant?.productId as ID;
  }

  private async findSalePriceLimit(productId: ID, sort: SortKey) {
    const result = await this.repository.findMany({
      where: { productId: productId },
      orderBy: { salePrice: sort },
      take: 1,
      fields: ['salePrice']
    });

    return result[0];
  }
}

type UpdateProductRangePriceInput = {
  productId?: ID;
  variantId?: ID;
};
