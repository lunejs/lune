import { LunePrice } from '@lune/common';

import { useCreateProduct } from '@/lib/product/hooks/use-create-product';

import type { ProductDetailsFormInput } from './use-product-details-form';

export const useProductDetailsCreate = () => {
  const { createProduct: create } = useCreateProduct();

  const exec = (input: ProductDetailsFormInput) => {
    const { options, variants } = input;

    return create({
      name: input.name,
      description: input.description,
      enabled: input.enabled,
      images: input.images,
      options,
      variants: variants.length
        ? variants.map(v => ({
            salePrice: v.salePrice ? LunePrice.parse(v.salePrice) : 0,
            stock: v.stock || 0,
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
