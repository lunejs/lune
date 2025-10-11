import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';

export const useUpdateProduct = () => {
  const { mutateAsync: updateProduct } = useGqlMutation(UPDATE_PRODUCT_MUTATION);

  const update = async (productId: string, input: UpdateProductInput) => {
    await updateProduct({
      id: productId,
      input: {
        name: input.name,
        description: input.description,
        enabled: input.enabled
      }
    });
  };

  return {
    updateProduct: update
  };
};
type UpdateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
};
