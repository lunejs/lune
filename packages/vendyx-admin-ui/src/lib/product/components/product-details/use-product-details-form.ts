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

  const form = useForm<FormInput>({
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
      height: defaultVariant?.dimensions?.height ?? ''
    }
  });

  const onSubmit = async (input: FormInput) => {
    try {
      if (product) {
        await updateProduct(product.id, {
          name: input.name,
          description: input.description,
          enabled: input.enabled
        });

        form.reset({
          enabled: input.enabled,
          name: input.name,
          description: product.description ?? '',
          requiresShipping: input.requiresShipping
        });

        notification.success('Product updated');

        return;
      }

      const productId = await createProduct({
        name: input.name,
        description: input.description,
        enabled: input.enabled,
        images: input.images,

        variants: [
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
  height: z.coerce.number().min(0, 'Height should be greater than 0').optional().or(z.literal(''))
});

type FormInput = z.infer<typeof schema>;

export const useProductDetailsFormContext = (): HookReturn => {
  return useFormContext<FormInput>() as HookReturn;
};

type HookReturn = UseFormReturn<FormInput> & {
  product: CommonProductFragment | null;
};
