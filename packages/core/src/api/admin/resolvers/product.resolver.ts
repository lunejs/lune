import { ExecutionContext } from '@/api/shared/context/types';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import { QueryProductArgs, QueryProductsArgs } from '@/api/shared/types/graphql';
import { ProductService } from '@/business/product/product.service';
import { ListResponse } from '@/utils/list-response';
import { clean } from '@vendyx/common';

async function products(_, { input }: QueryProductsArgs, ctx: ExecutionContext) {
  const productService = new ProductService(ctx);

  const [products, count] = await Promise.all([
    productService.find(input ?? {}),
    productService.count(input?.filters)
  ]);

  return new ListResponse(products, products.length, { total: count });
}

async function product(_, input: QueryProductArgs, ctx: ExecutionContext) {
  const productService = new ProductService(ctx);

  const { id, slug } = clean(input);

  return productService.findUnique(id, slug);
}

export const ProductResolver = {
  Mutation: {},
  Query: {
    product: UseUserGuard(product),
    products: UseUserGuard(products)
  }
};
