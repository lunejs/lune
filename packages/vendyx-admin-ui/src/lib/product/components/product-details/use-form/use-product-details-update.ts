import { parsePrice } from '@vendyx/common';

import type { CommonProductFragment } from '@/lib/api/types';
import { useUpdateProduct } from '@/lib/product/hooks/use-update-product';

import type { ProductDetailsFormInput } from './use-product-details-form';

export const useProductDetailsUpdate = () => {
  const { updateProduct: update } = useUpdateProduct();

  const exec = (product: CommonProductFragment, input: ProductDetailsFormInput) => {
    const { variants, options } = input;

    const productHasDefaultVariant = product.variants.items[0].optionValues.length === 0;
    const defaultVariant = product?.variants.items[0];

    return update(product.id, {
      name: input.name,
      description: input.description,
      enabled: input.enabled,
      defaultVariant: productHasDefaultVariant ? product.variants.items[0].id : null,
      variants: variants.length
        ? variants.map(v => ({
            id: v?.id as string,
            salePrice: v.salePrice ? parsePrice(v.salePrice) : 0,
            comparisonPrice: v.comparisonPrice ? parsePrice(v.comparisonPrice) : 0,
            stock: v.stock || 0,
            sku: v.sku,
            weight: v.weight as number,
            length: v.length as number,
            width: v.width as number,
            height: v.height as number,
            requiresShipping: v.requiresShipping,
            optionValues: v.optionValues
          }))
        : [
            {
              id: defaultVariant?.id as string,
              salePrice: input.salePrice ? parsePrice(input.salePrice) : 0,
              comparisonPrice: input.comparisonPrice ? parsePrice(input.comparisonPrice) : 0,
              stock: input.stock || 0,
              sku: input.sku,
              weight: input.weight as number,
              length: input.length as number,
              width: input.width as number,
              height: input.height as number,
              requiresShipping: input.requiresShipping
            }
          ],
      variantsToRemove:
        product?.variants.items
          .filter(variant => !variants.some(v => v.id === variant.id))
          .filter(variant => (!variants.length ? variant.id !== defaultVariant?.id : true)) // Don't remove the default variant
          .map(variant => variant.id) ?? [],
      optionsToRemove:
        product?.options
          .filter(option => !options.some(o => o.id === option.id))
          .map(option => option.id) ?? [],
      options
    });
  };

  return {
    updateProduct: exec
  };
};
