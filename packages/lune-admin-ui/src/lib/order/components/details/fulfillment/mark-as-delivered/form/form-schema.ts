import z from 'zod';

export const MarkAsDeliveredFormSchema = z.object({
  shouldCompleteOrder: z.boolean()
});
