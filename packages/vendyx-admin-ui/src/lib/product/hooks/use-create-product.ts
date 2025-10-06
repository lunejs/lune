import { notification } from '@vendyx/ui';

import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { CREATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';

export const useCreateProduct = () => {
  const { mutateAsync: createProduct } = useGqlMutation(CREATE_PRODUCT_MUTATION);

  const create = async (input: CreateProductInput) => {
    try {
      await createProduct({
        input: {
          name: input.name,
          description: input.description,
          enabled: input.enabled
        }
      });
    } catch {
      notification.error('An unexpected error occurred');
    }
  };

  return {
    createProduct: create
  };
};

type CreateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  images: FormData;
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
