import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const CustomFieldDetailsSchema = z.object({
  name: z.string().min(1, FormMessages.required),
  type: z.string().min(1, FormMessages.required), // TODO: make enum
  quantity: z.enum(['single', 'multiple'])
});
