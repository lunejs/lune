import z from 'zod';

export const ShopSocialsFormSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional()
});
