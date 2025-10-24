import type { VendyxEntity } from '@/persistence/entities/entity';
import type { Option } from '@/persistence/entities/option';
import type { OptionValue } from '@/persistence/entities/option_value';
import type { Product } from '@/persistence/entities/product';

import type { ExecutionContext } from '../context/types';

export const getProductLocalizedField = async (
  ctx: ExecutionContext,
  parent: Product,
  field: keyof Product
) => {
  return getLocalizedField(ctx, parent, field, 'product');
};

export const getOptionLocalizedField = async (
  ctx: ExecutionContext,
  parent: Option,
  field: keyof Option
) => {
  return getLocalizedField(ctx, parent, field, 'option');
};

export const getOptionValueLocalizedField = async (
  ctx: ExecutionContext,
  parent: OptionValue,
  field: keyof OptionValue
) => {
  return getLocalizedField(ctx, parent, field, 'optionValue');
};

const getLocalizedField = async <T extends VendyxEntity>(
  ctx: ExecutionContext,
  parent: T,
  field: keyof T,
  key: 'product' | 'option' | 'optionValue'
) => {
  if (!ctx.storefront?.locale) return parent[field];

  const translation = await ctx.loaders[key].localization.load(parent.id);

  return translation?.[field as any] ?? parent[field];
};
