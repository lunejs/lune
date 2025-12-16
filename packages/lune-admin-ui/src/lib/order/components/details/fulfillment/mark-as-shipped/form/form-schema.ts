import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const MarkAsShippedFormSchema = z.object({
  trackingCode: z.string().min(1, FormMessages.required),
  carrier: z.string().min(1, FormMessages.required)
});
