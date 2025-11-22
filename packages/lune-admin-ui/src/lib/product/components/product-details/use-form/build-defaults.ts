import { formatPrice } from '@lune/common';

import type { CommonProductFragment } from '@/lib/api/types';

export const buildDefaultValues = (product: CommonProductFragment | null | undefined) => {
  return {
    ...buildDefaultGeneralInfo(product),
    ...buildDefaultVariant(product),
    variants: buildDefaultVariants(product),
    options: buildDefaultOptions(product)
  };
};

const buildDefaultGeneralInfo = (product: CommonProductFragment | null | undefined) => {
  return {
    enabled: product?.enabled ?? true,
    name: product?.name ?? '',
    description: product?.description ?? ''
  };
};

const buildDefaultVariant = (product: CommonProductFragment | null | undefined) => {
  const defaultVariant = product?.variants.items[0];

  return {
    salePrice: defaultVariant?.salePrice ? formatPrice(defaultVariant.salePrice) : '',
    comparisonPrice: defaultVariant?.comparisonPrice
      ? formatPrice(defaultVariant.comparisonPrice)
      : '',
    stock: defaultVariant?.stock,
    sku: defaultVariant?.sku ?? '',
    requiresShipping: defaultVariant?.requiresShipping ?? false,
    weight: (defaultVariant?.weight ?? '') as number,
    length: (defaultVariant?.dimensions?.length ?? '') as number,
    width: (defaultVariant?.dimensions?.width ?? '') as number,
    height: (defaultVariant?.dimensions?.height ?? '') as number
  };
};

const buildDefaultVariants = (product: CommonProductFragment | null | undefined) => {
  return (
    product?.variants.items
      .map(variant => ({
        id: variant.id,
        salePrice: variant.salePrice ? formatPrice(variant.salePrice) : '',
        comparisonPrice: variant.comparisonPrice ? formatPrice(variant.comparisonPrice) : '',
        stock: variant.stock,
        sku: variant.sku ?? '',
        requiresShipping: variant.requiresShipping ?? false,
        weight: (variant.weight ?? '') as number,
        length: (variant.dimensions?.length ?? '') as number,
        width: (variant.dimensions?.width ?? '') as number,
        height: (variant.dimensions?.height ?? '') as number,
        optionValues: variant.optionValues
      }))
      .filter(v => v.optionValues.length) ?? []
  );
};

const buildDefaultOptions = (product: CommonProductFragment | null | undefined) => {
  return (
    product?.options.map(option => ({
      id: option.id,
      name: option.name,
      values: option.values.map(value => ({
        id: value.id,
        name: value.name
      }))
    })) ?? []
  );
};
