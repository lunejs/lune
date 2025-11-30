import z from 'zod';

import { CollectionContentType } from '@/lib/api/types';
import { FormMessages } from '@/shared/forms/form-messages';

export const CollectionDetailsFormSchema = z.object({
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  image: z.string().optional(),
  enabled: z.boolean(),
  contentType: z
    .enum([CollectionContentType.Products, CollectionContentType.Collections])
    .default(CollectionContentType.Products)
});
