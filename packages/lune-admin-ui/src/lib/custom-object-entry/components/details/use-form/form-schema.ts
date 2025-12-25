import z from 'zod';

export const CustomObjectEntrySchema = z.object({
  customFields: z.record(z.string(), z.any())
});
