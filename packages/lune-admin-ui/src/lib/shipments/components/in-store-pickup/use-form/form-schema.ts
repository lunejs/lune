import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const inStorePickupSchema = z.object({
  isAvailable: z.boolean(),
  instructions: z.string().min(1, FormMessages.required).max(255, FormMessages.max(255))
});
