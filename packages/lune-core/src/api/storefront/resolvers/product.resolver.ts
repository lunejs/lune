import { clean } from '@lunejs/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonOptionValueFieldResolver } from '@/api/shared/resolvers/option-value-field.resolver';
import { CommonProductFieldResolver } from '@/api/shared/resolvers/product-field.resolver';
import { CommonVariantFieldResolver } from '@/api/shared/resolvers/variant-field.resolver';
import type {
  ProductCustomFieldsArgs,
  QueryProductArgs,
  QueryProductsArgs
} from '@/api/shared/types/graphql';
import { getProductLocalizedField } from '@/api/shared/utils/get-localized-field';
import { ListResponse } from '@/api/shared/utils/list-response';
import { ProductService } from '@/business/product/product.service';
import type { Product } from '@/persistence/entities/product';

import { UseStorefrontApiKeyGuard } from '../guards/storefront-api-key.guard';

async function products(_, { input }: QueryProductsArgs, ctx: ExecutionContext) {
  const productService = new ProductService(ctx);

  const [products, count] = await Promise.all([
    productService.find({
      ...input,
      filters: { ...input?.filters, enabled: { equals: true }, archived: { equals: false } }
    }),
    productService.count({
      ...input?.filters,
      enabled: { equals: true },
      archived: { equals: false }
    })
  ]);

  return new ListResponse(products, products.length, { total: count });
}

async function product(_, input: QueryProductArgs, ctx: ExecutionContext) {
  const productService = new ProductService(ctx);

  const { id, slug } = clean(input);

  return productService.findUnique(id, slug, { enabled: true, archived: false });
}

export const ProductResolver: GraphqlApiResolver = {
  Query: {
    product: UseStorefrontApiKeyGuard(product),
    products: UseStorefrontApiKeyGuard(products)
  },
  Product: {
    ...CommonProductFieldResolver,
    name: async (parent: Product, _, ctx: ExecutionContext) => {
      return getProductLocalizedField(ctx, parent, 'name');
    },
    slug: async (parent: Product, _, ctx: ExecutionContext) => {
      return getProductLocalizedField(ctx, parent, 'slug');
    },
    description: async (parent: Product, _, ctx: ExecutionContext) => {
      return getProductLocalizedField(ctx, parent, 'description');
    },
    customFields: async (
      parent: Product,
      { keys }: ProductCustomFieldsArgs,
      ctx: ExecutionContext
    ) => {
      const fields = await ctx.loaders.product.customFields.load({
        productId: parent.id,
        keys
      });

      return fields.map(f => ({
        ...f.definition,
        id: f.id,
        value: f.value
      }));
    }
  },
  Variant: {
    ...CommonVariantFieldResolver
  },
  OptionValue: {
    ...CommonOptionValueFieldResolver
  }
};
