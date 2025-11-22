import { notification } from '@lune/ui';

import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_OPTION_MUTATION } from '@/lib/api/operations/option.operations';
import { CREATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import { CREATE_VARIANT_MUTATION } from '@/lib/api/operations/variant.operations';
import type { LuneAsset } from '@/lib/api/types';
import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';

export const useCreateProduct = () => {
  const { uploadAsset } = useUploadAsset();
  const { mutateAsync: createProduct } = useGqlMutationDEPRECATED(CREATE_PRODUCT_MUTATION);
  const { mutateAsync: createVariants } = useGqlMutationDEPRECATED(CREATE_VARIANT_MUTATION);
  const { mutateAsync: createOptions } = useGqlMutationDEPRECATED(CREATE_OPTION_MUTATION);

  const create = async (input: CreateProductInput) => {
    let images: Omit<LuneAsset, 'order'>[] = [];

    if (input.images?.length) {
      const result = await uploadAsset(input.images);

      if (!result.success) {
        notification.error('Error during uploading images');
        return;
      }

      images = result.data;
    }

    const { id } = await createProduct({
      input: {
        name: input.name,
        description: input.description,
        enabled: input.enabled,
        assets: images.map((image, i) => ({ id: image.id, order: i }))
      }
    });

    if (!input.options?.length) {
      await createVariants({
        productId: id,
        input: input.variants.map(variant => ({
          salePrice: variant.salePrice,
          comparisonPrice: variant.comparisonPrice,
          stock: variant.stock,
          sku: variant.sku,
          requiresShipping: variant.requiresShipping,
          weight: variant.weight,
          dimensions: { height: variant.height, width: variant.width, length: variant.length },
          optionValues: variant.optionValues?.map(value => value.id)
        }))
      });

      return id;
    }

    const options = await createOptions({
      productId: id,
      input: input.options.map((option, i) => ({
        order: i,
        name: option.name,
        values: option.values.map((value, i) => ({
          name: value.name,
          order: i
        }))
      }))
    });

    const newVariants = attachOptionValues(options, input.variants);

    await createVariants({
      productId: id,
      input: newVariants.map(variant => ({
        salePrice: variant.salePrice,
        comparisonPrice: variant.comparisonPrice,
        stock: variant.stock,
        sku: variant.sku,
        requiresShipping: variant.requiresShipping,
        weight: variant.weight,
        dimensions: { height: variant.height, width: variant.width, length: variant.length },
        optionValues: variant.optionValues?.map(value => value.id)
      }))
    });

    return id;
  };

  return {
    createProduct: create
  };
};

const attachOptionValues = (
  options: CreateProductInput['options'],
  variants: CreateProductInput['variants']
) => {
  return variants.map(variant => {
    const variantOptionValues = variant.optionValues ?? [];

    const valuesIds = options
      .map(option => {
        const value = option.values.find(value =>
          variantOptionValues.map(variantValue => variantValue.name).includes(value.name)
        );

        return value?.id ?? '';
      })
      .filter(Boolean);

    return {
      ...variant,
      optionValues: valuesIds.map(id => ({ id, name: '' }))
    };
  });
};

type CreateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  images?: File[];
  options: {
    id: string;
    name: string;
    values: { id: string; name: string; color?: string; translation?: string }[];
  }[];
  variants: {
    salePrice: number;
    comparisonPrice?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    optionValues?: { id: string; name: string; color?: string; translation?: string }[];
  }[];
};
