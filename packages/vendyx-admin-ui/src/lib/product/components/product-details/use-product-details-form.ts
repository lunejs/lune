import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { formatPrice, parsePrice } from '@vendyx/common';
import { notification } from '@vendyx/ui';

import type { CommonProductFragment } from '@/lib/api/types';
import { FormMessages } from '@/shared/forms/form-messages';

import { useCreateProduct } from '../../hooks/use-create-product';
import { useUpdateProduct } from '../../hooks/use-update-product';

export const useProductDetailsForm = (product?: CommonProductFragment | null) => {
  const navigate = useNavigate();

  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();

  const defaultVariant = product?.variants.items[0];

  const form = useForm<ProductDetailsFormInput>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      enabled: product?.enabled ?? true,
      name: product?.name ?? '',
      description: product?.description ?? '',

      salePrice: defaultVariant?.salePrice ? formatPrice(defaultVariant.salePrice) : '',
      comparisonPrice: defaultVariant?.comparisonPrice
        ? formatPrice(defaultVariant.comparisonPrice)
        : '',
      stock: defaultVariant?.stock ?? '',
      sku: defaultVariant?.sku ?? '',
      requiresShipping: defaultVariant?.requiresShipping ?? false,
      weight: defaultVariant?.weight ?? '',
      length: defaultVariant?.dimensions?.length ?? '',
      width: defaultVariant?.dimensions?.width ?? '',
      height: defaultVariant?.dimensions?.height ?? '',

      variants:
        product?.variants.items
          .map(variant => ({
            salePrice: variant.salePrice ? formatPrice(variant.salePrice) : '',
            comparisonPrice: variant.comparisonPrice ? formatPrice(variant.comparisonPrice) : '',
            stock: variant.stock ?? '',
            sku: variant.sku ?? '',
            requiresShipping: variant.requiresShipping ?? false,
            weight: (variant.weight ?? '') as number,
            length: (variant.dimensions?.length ?? '') as number,
            width: (variant.dimensions?.width ?? '') as number,
            height: (variant.dimensions?.height ?? '') as number,
            optionValues: variant.optionValues
          }))
          .filter(v => v.optionValues.length) ?? [],
      options:
        product?.options.map(option => ({
          id: option.id,
          name: option.name,
          values: option.values.map(value => ({
            id: value.id,
            name: value.name
            // translation: value.translation
          }))
        })) ?? []
    }
  });

  const onSubmit = async (input: ProductDetailsFormInput) => {
    const { variants, options } = input;

    try {
      if (product) {
        const productHasDefaultVariant = product.variants.items[0].optionValues.length === 0;

        await updateProduct(product.id, {
          name: input.name,
          description: input.description,
          enabled: input.enabled,
          defaultVariant: productHasDefaultVariant ? product.variants.items[0].id : null,
          variants: variants.length
            ? variants.map(v => ({
                id: v?.id as string,
                salePrice: v.salePrice ? parsePrice(v.salePrice) : 0,
                comparisonPrice: v.comparisonPrice ? parsePrice(v.comparisonPrice) : 0,
                stock: v.stock || 0,
                sku: v.sku,
                weight: v.weight as number,
                length: v.length as number,
                width: v.width as number,
                height: v.height as number,
                requiresShipping: v.requiresShipping,
                optionValues: v.optionValues
              }))
            : [
                {
                  id: defaultVariant?.id as string,
                  salePrice: input.salePrice ? parsePrice(input.salePrice) : 0,
                  comparisonPrice: input.comparisonPrice ? parsePrice(input.comparisonPrice) : 0,
                  stock: input.stock || 0,
                  sku: input.sku,
                  weight: input.weight as number,
                  length: input.length as number,
                  width: input.width as number,
                  height: input.height as number,
                  requiresShipping: input.requiresShipping
                }
              ],
          variantsToRemove:
            product?.variants.items
              .filter(variant => !variants.some(v => v.id === variant.id))
              .filter(variant => (!variants.length ? variant.id !== defaultVariant?.id : true)) // Don't remove the default variant
              .map(variant => variant.id) ?? [],
          optionsToRemove:
            product?.options
              .filter(option => !options.some(o => o.id === option.id))
              .map(option => option.id) ?? [],
          options
        });

        form.reset({
          enabled: input.enabled,
          name: input.name,
          description: product.description ?? '',
          requiresShipping: input.requiresShipping,
          comparisonPrice: input.comparisonPrice,
          height: input.height,
          length: input.length,
          salePrice: input.salePrice,
          width: input.width,
          sku: input.sku,
          stock: input.stock,
          weight: input.weight
        });

        notification.success('Product updated');

        return;
      }

      const productId = await createProduct({
        name: input.name,
        description: input.description,
        enabled: input.enabled,
        images: input.images,
        options,
        variants: variants.length
          ? variants.map(v => ({
              salePrice: v.salePrice ? parsePrice(v.salePrice) : 0,
              comparisonPrice: v.comparisonPrice ? parsePrice(v.comparisonPrice) : 0,
              stock: v.stock || 0,
              sku: v.sku,
              weight: v.weight as number,
              length: v.length as number,
              width: v.width as number,
              height: v.height as number,
              requiresShipping: v.requiresShipping,
              optionValues: v.optionValues
            }))
          : [
              {
                salePrice: input.salePrice ? parsePrice(input.salePrice) : 0,
                comparisonPrice: input.comparisonPrice ? parsePrice(input.comparisonPrice) : 0,
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

      navigate(`/products/${productId}`);
    } catch (error) {
      console.error(error);
      notification.error('An unexpected error occurred');
    }
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form,
    product
  };
};

const schema = z.object({
  // general
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
  enabled: z.boolean(),

  // default variant
  salePrice: z.string().optional(),
  comparisonPrice: z.string().optional(),
  stock: z.coerce
    .number()
    .int('Must be an integer')
    .min(0, 'Stock should be greater than 0')
    .optional()
    .or(z.literal('')),
  sku: z.string().optional(),
  requiresShipping: z.boolean(),
  weight: z.coerce.number().min(0, 'Weight should be greater than 0').optional().or(z.literal('')),
  length: z.coerce.number().min(0, 'Length should be greater than 0').optional().or(z.literal('')),
  width: z.coerce.number().min(0, 'Width should be greater than 0').optional().or(z.literal('')),
  height: z.coerce.number().min(0, 'Height should be greater than 0').optional().or(z.literal('')),

  // variants
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      values: z.array(
        z.object({
          id: z.string(),
          name: z.string()
          // translation: z.string().optional(),
          // color: z.string().optional()
        })
      )
    })
  ),
  variants: z.array(
    z.object({
      id: z.string(),
      salePrice: z.string().optional(),
      comparisonPrice: z.string().optional(),
      stock: z.coerce
        .number()
        .int('Must be an integer')
        .min(0, 'Stock should be greater than 0')
        .optional()
        .or(z.literal('')),
      sku: z.string().optional(),
      requiresShipping: z.boolean(),
      weight: z.coerce
        .number()
        .min(0, 'Weight should be greater than 0')
        .optional()
        .or(z.literal('')),
      length: z.coerce
        .number()
        .min(0, 'Length should be greater than 0')
        .optional()
        .or(z.literal('')),
      width: z.coerce
        .number()
        .min(0, 'Width should be greater than 0')
        .optional()
        .or(z.literal('')),
      height: z.coerce
        .number()
        .min(0, 'Height should be greater than 0')
        .optional()
        .or(z.literal('')),

      optionValues: z.array(
        z.object({
          id: z.string(),
          name: z.string()
          // translation: z.string().optional(),
          // color: z.string().optional()
        })
      )
    })
  )
});

export type ProductDetailsFormInput = z.infer<typeof schema>;

export const useProductDetailsFormContext = (): HookReturn => {
  return useFormContext<ProductDetailsFormInput>() as HookReturn;
};

type HookReturn = UseFormReturn<ProductDetailsFormInput> & {
  product: CommonProductFragment | null;
};
