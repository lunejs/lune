import { LunePrice } from '@lunejs/common';

import { useCreateProduct } from '@/lib/product/hooks/use-create-product';

import type { ProductDetailsFormInput } from './use-product-details-form';

export const useProductDetailsCreate = () => {
  const { createProduct: create } = useCreateProduct();

  const exec = (input: ProductDetailsFormInput) => {
    const { options, variants, customFields } = input;

    return create({
      name: input.name,
      description: input.description,
      enabled: input.enabled,
      images: input.images,
      options,
      customFields: customFields,
      variants: variants.length
        ? variants.map(v => ({
            salePrice: v.salePrice ? LunePrice.parse(v.salePrice) : 0,
            stock: v.stock || 0,
            comparisonPrice: v.comparisonPrice ? LunePrice.parse(v.comparisonPrice) : 0,
            sku: v.sku,
            requiresShipping: v.requiresShipping,
            weight: v.weight as number,
            height: v.height as number,
            width: v.width as number,
            length: v.length as number,
            optionValues: v.optionValues
          }))
        : [
            {
              salePrice: input.salePrice ? LunePrice.parse(input.salePrice) : 0,
              comparisonPrice: input.comparisonPrice ? LunePrice.parse(input.comparisonPrice) : 0,
              stock: input.stock || 0,
              sku: input.sku,
              weight: input.weight as number,
              length: input.length as number,
              width: input.width as number,
              height: input.height as number,
              requiresShipping: input.requiresShipping
            }
          ]
    });
  };

  return {
    createProduct: exec
  };
};
