import { ExecutionContext } from '@/api/shared/context/types';
import { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import {
  MutationCreateProductArgs,
  MutationUpdateProductArgs,
  QueryProductArgs,
  QueryProductsArgs
} from '@/api/shared/types/graphql';
import { ProductService } from '@/business/product/product.service';
import { ListResponse } from '@/utils/list-response';
import { clean } from '../../../../../vendyx-common/dist/index.cjs';

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

async function createProduct(_, { input }: MutationCreateProductArgs, ctx: ExecutionContext) {
  const productService = new ProductService(ctx);

  const result = await productService.create(input);

  return result;
}

async function updateProduct(_, { id, input }: MutationUpdateProductArgs, ctx: ExecutionContext) {
  const productService = new ProductService(ctx);

  const result = await productService.update(id, input);

  return result;
}

export const ProductResolver: GraphqlApiResolver = {
  Mutation: {
    createProduct: UseUserGuard(createProduct),
    updateProduct: UseUserGuard(updateProduct)
  },
  Query: {
    product: UseUserGuard(product),
    products: UseUserGuard(products)
  }
};
