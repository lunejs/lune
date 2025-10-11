import { notification } from '@vendyx/ui';

import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import type { VendyxAsset } from '@/lib/api/types';
import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';

export const useCreateProduct = () => {
  const { mutateAsync: createProduct } = useGqlMutation(CREATE_PRODUCT_MUTATION);
  const { uploadAsset } = useUploadAsset();

  const create = async (input: CreateProductInput) => {
    let images: Omit<VendyxAsset, 'order'>[] = [];

    if (input.images?.length) {
      const result = await uploadAsset(input.images);

      if (!result.success) {
        notification.error('Error during uploading images');
        return;
      }

      images = result.data;
    }

    await createProduct({
      input: {
        name: input.name,
        description: input.description,
        enabled: input.enabled,
        assets: images.map((image, i) => ({ id: image.id, order: i }))
      }
    });
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
  // tags: string[] | undefined;
  // options: {
  //   id: string;
  //   name: string;
  //   values: { id: string; name: string; color?: string; translation?: string }[];
  // }[];
  // variants: {
  //   salePrice: number;
  //   comparisonPrice?: number;
  //   stock?: number;
  //   sku?: string;
  //   requiresShipping?: boolean;
  //   weight?: number;
  //   length?: number;
  //   width?: number;
  //   height?: number;
  //   optionValues?: { id: string; name: string; color?: string; translation?: string }[];
  // }[];
};
