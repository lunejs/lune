import z from 'zod';

import { CustomFieldType } from '@/lib/api/types';
import { FormMessages } from '@/shared/forms/form-messages';

export const CustomFieldDetailsSchema = z.object({
  name: z.string().min(1, FormMessages.required),
  type: z.enum(
    [
      CustomFieldType.Boolean,
      CustomFieldType.Date,
      CustomFieldType.Decimal,
      CustomFieldType.Image,
      CustomFieldType.Integer,
      CustomFieldType.Money,
      CustomFieldType.MultiLineText,
      CustomFieldType.ProductReference,
      CustomFieldType.CollectionReference,
      CustomFieldType.SingleLineText,
      CustomFieldType.CustomObjectReference,
      CustomFieldType.Url,
      CustomFieldType.Color
    ],
    'Invalid type'
  ),
  referenceTargetId: z.uuid().optional(),
  quantity: z.enum(['single', 'multiple'])
});
