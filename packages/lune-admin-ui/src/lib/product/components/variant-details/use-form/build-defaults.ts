import { isNumber, LunePrice } from '@lunejs/common';

import type { CommonVariantFragment } from '@/lib/api/types';

export const buildDefaultVariantForm = (variant: CommonVariantFragment) => ({
  salePrice: LunePrice.format(variant.salePrice),
  comparisonPrice: isNumber(variant.comparisonPrice)
    ? LunePrice.format(variant.comparisonPrice)
    : '',
  stock: variant.stock,
  sku: variant.sku ?? '',
  requiresShipping: variant.requiresShipping,
  weight: variant.weight,
  height: variant.dimensions?.height,
  length: variant.dimensions?.length,
  width: variant.dimensions?.width
});
