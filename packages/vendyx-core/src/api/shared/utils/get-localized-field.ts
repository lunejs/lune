import { Product } from '@/persistence/entities/product';

import { ExecutionContext } from '../context/types';

export const getProductLocalizedField = async (
  ctx: ExecutionContext,
  parent: Product,
  field: keyof Product
) => {
  if (!ctx.storefront?.locale) return parent[field];

  const translation = await ctx.loaders.product.localization.load(parent.id);

  return translation?.[field] ?? parent[field];
};
