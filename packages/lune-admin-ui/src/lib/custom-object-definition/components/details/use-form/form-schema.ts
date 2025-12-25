import z from 'zod';

import { CustomFieldType } from '@/lib/api/types';
import { FormMessages } from '@/shared/forms/form-messages';

export const CustomObjectFormSchema = z.object({
  name: z.string().min(1, FormMessages.required),
  displayField: z.literal('auto').or(z.string()),
  fields: z.array(
    z.object({
      fieldId: z.uuid().optional(),
      name: z.string().min(1, FormMessages.required),
      type: z.enum([
        CustomFieldType.Boolean,
        CustomFieldType.Date,
        CustomFieldType.Decimal,
        CustomFieldType.Image,
        CustomFieldType.Integer,
        CustomFieldType.Money,
        CustomFieldType.MultiLineText,
        CustomFieldType.ProductReference,
        CustomFieldType.CollectionReference,
        CustomFieldType.SingleLineText
      ]),
      quantity: z.enum(['single', 'multiple'])
    })
  )
});
