import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const LocationDetailsSchema = z.object({
  name: z.string().min(1, FormMessages.required),
  phoneNumber: z.string().min(1, FormMessages.required),
  country: z.string().min(1, FormMessages.required),
  streetLine1: z.string().min(1, FormMessages.required),
  streetLine2: z.string().optional(),
  city: z.string().min(1, FormMessages.required),
  postalCode: z.string().min(1, FormMessages.required),
  province: z.string().min(1, FormMessages.required)
});
