import z from 'zod';

export const CancelOrderFormSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  shouldRestock: z.boolean()
});
