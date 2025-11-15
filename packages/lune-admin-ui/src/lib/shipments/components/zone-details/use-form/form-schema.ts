import z from 'zod';

import { FormMessages } from '@/shared/forms/form-messages';

export const ZoneDetailsFormSchema = z.object({
  name: z.string().min(1, FormMessages.min(1)),
  states: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  )
});
