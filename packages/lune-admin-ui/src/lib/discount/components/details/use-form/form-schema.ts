import z from 'zod';

import { DiscountApplicationMode } from '@/lib/api/types';
import { FormMessages } from '@/shared/forms/form-messages';

export const DiscountDetailsSchema = z.object({
  code: z.string().min(0, FormMessages.required),
  perCustomerLimit: z.coerce
    .number()
    .int()
    .min(0, FormMessages.greater(0))
    .optional()
    .or(z.literal('')),
  applicationMode: z.enum([DiscountApplicationMode.Automatic, DiscountApplicationMode.Code]),
  startsAt: z.date(),
  endsAt: z.date().optional(),
  enabled: z.boolean()
});
