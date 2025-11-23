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

    // Map option values: variant value names → real DB IDs
    const optionValueIdMap = new Map<string, string>();
    options.forEach(option => {
      option.values.forEach(value => {
        optionValueIdMap.set(value.name, value.id);
      });
    });

    await createVariants({
      productId: id,
      input: input.variants.map(variant => ({
        salePrice: variant.salePrice,
        stock: variant.stock,
        // Map variant option values from names to real DB IDs
        optionValues: variant.optionValues
          ?.map(v => optionValueIdMap.get(v.name) ?? v.id)
          .filter(Boolean) as string[]
      }))
    });

    return id;
  };

  return {
    createProduct: create
  };
};

type CreateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  images?: File[];
  options: {
    id: string;
    name: string;
    values: { id: string; name: string }[];
  }[];
  variants: {
    salePrice: number;
    stock?: number;
    // Fields only for default variant (when no options)
    comparisonPrice?: number;
    sku?: string;
    requiresShipping?: boolean;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    // Fields only for variants with options
    optionValues?: { id: string; name: string }[];
  }[];
};
