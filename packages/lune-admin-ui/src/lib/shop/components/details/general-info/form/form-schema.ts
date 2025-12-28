import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const ShopGeneralInfoFormSchema = z.object({
  name: z.string().min(1, FormMessages.required),
  email: z.email(FormMessages.invalidEmail),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  logo: z.string().optional()
});
