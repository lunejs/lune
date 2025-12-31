import { clean, isArray, isNumber, isTruthy, LunePrice } from '@lunejs/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateVariantInput, UpdateVariantInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { ProductRepository } from '@/persistence/repositories/product-repository';
import { SortKey } from '@/persistence/repositories/repository';
import type { VariantRepository } from '@/persistence/repositories/variant-repository';

export class VariantService {
  repository: VariantRepository;
  productRepository: ProductRepository;

  constructor(private ctx: ExecutionContext) {
    this.repository = ctx.repositories.variant;
    this.productRepository = ctx.repositories.product;
  }

  async create(productId: ID, input: CreateVariantInput[]) {
    const variantsPromise = input.map(async (v, i) => {
      const now = new Date();

      const variant = await this.repository.create({
        ...clean(v),
        createdAt: new Date(now.setMilliseconds(now.getMilliseconds() + i)),
        salePrice: LunePrice.toCent(v.salePrice),
        comparisonPrice: v.comparisonPrice
          ? LunePrice.toCent(v.comparisonPrice)
          : v.comparisonPrice,
        costPerUnit: v.costPerUnit ? LunePrice.toCent(v.costPerUnit) : v.costPerUnit,
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

  async update(id: string, input: UpdateVariantInput) {
    const { optionValues, assets, ...baseVariant } = input;

    const result = await this.repository.update({
      where: { id },
      data: {
        ...clean(baseVariant),
        salePrice: isNumber(baseVariant.salePrice)
          ? LunePrice.toCent(baseVariant.salePrice)
          : undefined,
        comparisonPrice: isNumber(baseVariant.comparisonPrice)
          ? LunePrice.toCent(baseVariant.comparisonPrice)
          : baseVariant.comparisonPrice,
        costPerUnit: isNumber(baseVariant.costPerUnit)
          ? LunePrice.toCent(baseVariant.costPerUnit)
          : baseVariant.costPerUnit,
        dimensions: baseVariant.dimensions,
        sku: baseVariant.sku,
        weight: baseVariant.weight
      }
    });

    if (isNumber(input.salePrice)) {
      await this.updateProductRangePrice({ variantId: id });
    }

    if (assets?.length) {
      await this.repository.upsertAssets(id, assets);
    }

    if (optionValues?.length) {
      await this.repository.upsertOptionValues(id, optionValues);
    }

    await this.removeMissingAssets(id, assets);
    await this.removeMissingOptionValues(id, optionValues);

    return result;
  }

  async softRemove(id: ID) {
    const removedVariant = await this.repository.softRemove({ where: { id } });

    await this.updateProductRangePrice({ variantId: id });

    return removedVariant;
  }

  private async removeMissingAssets(variantId: ID, newAssets: UpdateVariantInput['assets']) {
    if (!isArray(newAssets)) return;

    const assets = await this.repository.findAssets(variantId);

    const assetsToRemove = assets
      .map(a => a.id)
      .filter(assetId => !newAssets.some(asset => asset.id === assetId))
      .map(assetToRemoveId => assets.find(a => a.id === assetToRemoveId))
      .filter(isTruthy);

    await this.repository.removeAssets(
      variantId,
      assetsToRemove.map(asset => asset.id)
    );
  }

  private async removeMissingOptionValues(
    variantId: string,
    newOptionValues: UpdateVariantInput['optionValues']
  ) {
    if (!isArray(newOptionValues)) return;

    const optionValues = await this.repository.findOptionValues(variantId);

    const optionValuesToRemove = optionValues
      .map(a => a.id)
      .filter(optionValueId => !newOptionValues.some(opv => opv === optionValueId))
      .map(optionValueToRemoveId => optionValues.find(a => a.id === optionValueToRemoveId))
      .filter(isTruthy);

    await this.repository.removeOptionValues(
      variantId,
      optionValuesToRemove.map(asset => asset.id)
    );
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
      where: { id: resolvedProductId },
      data: {
        minSalePrice: minSalePriceVariant?.salePrice ?? 0,
        maxSalePrice: maxSalePriceVariant?.salePrice ?? 0
      }
    });
  }

  private async getProductIdFromVariant(variantId: ID) {
    const productFromVariant = await this.repository.findOne({
      where: { id: variantId },
      fields: ['productId'],
      withDeleted: true
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
