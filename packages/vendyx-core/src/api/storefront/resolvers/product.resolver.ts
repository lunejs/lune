import { clean } from '@vendyx/common';

import { ExecutionContext } from '@/api/shared/context/types';
import { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { QueryProductArgs, QueryProductsArgs } from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { ProductService } from '@/business/product/product.service';

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
  }
};
