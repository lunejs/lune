import { isUUID } from '@vendyx/common';

import { useGqlMutation } from '@/lib/api/fetchers/use-gql-mutation';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import {
  CREATE_VARIANT_MUTATION,
  UPDATE_VARIANT_MUTATION
} from '@/lib/api/operations/variant.operations';

export const useUpdateProduct = () => {
  const { mutateAsync: updateProduct } = useGqlMutation(UPDATE_PRODUCT_MUTATION);
  const { mutateAsync: updateVariant } = useGqlMutation(UPDATE_VARIANT_MUTATION);
  const { mutateAsync: createVariants } = useGqlMutation(CREATE_VARIANT_MUTATION);

  const update = async (productId: string, input: UpdateProductInput) => {
    await updateProduct({
      id: productId,
      input: {
        name: input.name,
        description: input.description,
        enabled: input.enabled
      }
    });

    const variantsToUpdate = input.variants.filter(variant => isUUID(variant.id ?? ''));
    const variantsToCreate = input.variants.filter(variant => !isUUID(variant.id ?? ''));

    await Promise.all(
      variantsToUpdate.map(
        async variant =>
          await updateVariant({
            id: variant.id,
            input: {
              salePrice: variant.salePrice,
              comparisonPrice: variant.comparisonPrice,
              stock: variant.stock,
              sku: variant.sku,
              requiresShipping: variant.requiresShipping,
              weight: variant.weight,
              dimensions: { height: variant.height, width: variant.width, length: variant.length },
              optionValues: variant.optionValues?.map(value => value.id)
            }
          })
      )
    );
    await createVariants({
      productId: productId,
      input: variantsToCreate.map(variant => ({
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
  };

  return {
    updateProduct: update
  };
};
type UpdateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;

  variants: {
    id: string;
    salePrice: number;
    comparisonPrice?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    optionValues?: { id: string; name: string }[];
  }[];
};
