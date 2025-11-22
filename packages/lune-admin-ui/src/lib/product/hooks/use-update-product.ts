import { isUUID } from '@lune/common';

import { queryClient } from '@/app/app';
import { useGqlMutationDEPRECATED } from '@/lib/api/fetchers/use-gql-mutation';
import {
  CREATE_OPTION_MUTATION,
  REMOVE_OPTION_MUTATION,
  UPDATE_OPTION_MUTATION
} from '@/lib/api/operations/option.operations';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/api/operations/product.operations';
import {
  CREATE_VARIANT_MUTATION,
  REMOVE_VARIANT_MUTATION,
  UPDATE_VARIANT_MUTATION
} from '@/lib/api/operations/variant.operations';

import { ProductCacheKeys } from '../constants/cache-keys';

export const useUpdateProduct = () => {
  const { mutateAsync: updateProduct } = useGqlMutationDEPRECATED(UPDATE_PRODUCT_MUTATION);
  const { mutateAsync: updateVariant } = useGqlMutationDEPRECATED(UPDATE_VARIANT_MUTATION);
  const { mutateAsync: removeVariant } = useGqlMutationDEPRECATED(REMOVE_VARIANT_MUTATION);
  const { mutateAsync: createVariants } = useGqlMutationDEPRECATED(CREATE_VARIANT_MUTATION);
  const { mutateAsync: updateOptions } = useGqlMutationDEPRECATED(UPDATE_OPTION_MUTATION);
  const { mutateAsync: createOptions } = useGqlMutationDEPRECATED(CREATE_OPTION_MUTATION);
  const { mutateAsync: removeOption } = useGqlMutationDEPRECATED(REMOVE_OPTION_MUTATION);

  const update = async (productId: string, input: UpdateProductInput) => {
    const optionsToCreate = input.options?.filter(o => !isUUID(o.id));
    const optionsToUpdate = input.options?.filter(o => isUUID(o.id));

    if (optionsToCreate?.length && input.defaultVariant) {
      await removeVariant({ id: input.defaultVariant });
    }

    const optionsUpdated = optionsToUpdate.length
      ? await Promise.all(
          optionsToUpdate.map((option, i) =>
            updateOptions({
              id: option.id,
              input: {
                order: i,
                name: option.name,
                values: option.values.map((value, i) => ({
                  id: isUUID(value.id) ? value.id : '',
                  name: value.name,
                  order: isUUID(value.id) ? undefined : i
                }))
              }
            })
          )
        )
      : [];

    const optionsCreated = optionsToCreate.length
      ? await createOptions({
          productId,
          input: optionsToCreate.map((option, i) => ({
            order: optionsToUpdate.length + i,
            name: option.name,
            values: option.values.map((value, i) => ({
              name: value.name,
              order: i
            }))
          }))
        })
      : [];

    await Promise.all(input.optionsToRemove.map(optionId => removeOption({ id: optionId })));

    const newOptions = [...optionsUpdated, ...optionsCreated];
    const newVariants = attachOptionValues(newOptions, input.variants);

    await updateProduct({
      id: productId,
      input: {
        name: input.name,
        description: input.description,
        enabled: input.enabled
      }
    });

    const variantsToUpdate = newVariants.filter(variant => isUUID(variant.id ?? ''));
    const variantsToCreate = newVariants.filter(variant => !isUUID(variant.id ?? ''));

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
    if (variantsToCreate.length) {
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
    }

    await Promise.all(
      input.variantsToRemove.map(async variantId => await removeVariant({ id: variantId }))
    );

    queryClient.refetchQueries({ queryKey: [ProductCacheKeys.Product(productId)] });
  };

  return {
    updateProduct: update
  };
};

const attachOptionValues = (
  options: UpdateProductInput['options'],
  variants: UpdateProductInput['variants']
) => {
  return variants.map(variant => {
    const variantOptionValues = variant.optionValues ?? [];

    const valuesIds = options
      .map(option => {
        const value = option.values.find(value =>
          variantOptionValues.map(variantValue => variantValue.name).includes(value.name)
        );

        return value;
      })
      .filter(Boolean);

    return {
      ...variant,
      optionValues: valuesIds.map(id => ({ id: id?.id ?? '', name: id?.name ?? '' }))
    };
  });
};

type UpdateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;

  options: {
    id: string;
    name: string;
    values: { id: string; name: string; color?: string; translation?: string }[];
  }[];
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

  variantsToRemove: string[];
  optionsToRemove: string[];

  defaultVariant: string | null;
};
