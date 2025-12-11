import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const VariantDetailsSchema = z.object({
  salePrice: z.string().min(0, FormMessages.required),
  comparisonPrice: z.string().optional(),
  stock: z.coerce.number().int().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  sku: z.string(),
  requiresShipping: z.boolean(),
  weight: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  length: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  width: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal('')),
  height: z.coerce.number().min(0, FormMessages.greater(0)).optional().or(z.literal(''))
});
