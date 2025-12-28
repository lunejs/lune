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
                  name: value.presetId ? null : value.name,
                  presetId: value.presetId,
                  order: i
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
              name: value.presetId ? null : value.name,
              presetId: value.presetId,
              order: i
            }))
          }))
        })
      : [];

    await Promise.all(input.optionsToRemove.map(optionId => removeOption({ id: optionId })));

    const newOptions = [...optionsUpdated, ...optionsCreated];

    // Map option values: variant value names → real DB IDs
    const optionValueIdMap = new Map<string, string>();
    newOptions.forEach(option => {
      option.values.forEach(value => {
        optionValueIdMap.set(value.name, value.id);
      });
    });

    // Map variants with real DB IDs for option values
    const newVariants = input.variants.map(variant => ({
      ...variant,
      optionValues:
        variant.optionValues
          ?.map(v => ({ id: optionValueIdMap.get(v.name) ?? v.id, name: v.name }))
          .filter(v => v.id) ?? []
    }));

    await updateProduct({
      id: productId,
      input: {
        name: input.name,
        description: input.description,
        enabled: input.enabled,
        customFields: Object.entries(input.customFields).map(([key, value]) => ({ id: key, value }))
      }
    });

    const variantsToUpdate = newVariants.filter(variant => variant.action === 'none');
    const variantsToCreate = newVariants.filter(variant => variant.action === 'create');

    await Promise.all(
      variantsToUpdate.map(
        async variant =>
          await updateVariant({
            id: variant.id,
            input: {
              salePrice: variant.salePrice,
              stock: variant.stock,
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
          stock: variant.stock,
          comparisonPrice: variant.comparisonPrice,
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

    queryClient.refetchQueries({ queryKey: [ProductCacheKeys.Unique(productId)] });
  };

  return {
    updateProduct: update
  };
};

type UpdateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  customFields: Record<string, any>;

  options: {
    id: string;
    name: string;
    values: { id: string; name: string; presetId?: string }[];
  }[];
  variants: {
    id: string;
    action?: 'create' | 'update' | 'none';
    salePrice: number;
    stock?: number;
    optionValues?: { id: string; name: string }[];
    // Fields only for default variant (when no options)
    comparisonPrice?: number;
    sku?: string;
    requiresShipping?: boolean;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
  }[];

  variantsToRemove: string[];
  optionsToRemove: string[];

  defaultVariant: string | null;
};
