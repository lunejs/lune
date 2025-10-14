import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const ProductDetailsSchema = z.object({
  // general
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
  enabled: z.boolean(),

  // default variant
  salePrice: z.string().optional(),
  comparisonPrice: z.string().optional(),
  stock: z.coerce.number().int().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  sku: z.string().optional(),
  requiresShipping: z.boolean(),
  weight: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  length: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  width: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  height: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),

  // variants
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      values: z.array(
        z.object({
          id: z.string(),
          name: z.string()
        })
      )
    })
  ),
  variants: z.array(
    z.object({
      id: z.string(),
      salePrice: z.string().optional(),
      comparisonPrice: z.string().optional(),
      stock: z.coerce.number().int().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
      sku: z.string().optional(),
      requiresShipping: z.boolean(),
      weight: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
      length: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
      width: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
      height: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),

      optionValues: z.array(
        z.object({
          id: z.string(),
          name: z.string()
        })
      )
    })
  )
});
