import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import type z from 'zod';

import type { CommonShopFragment } from '@/lib/api/types';

import { ShopDetailsFormSchema } from './form-schema';

export const useShopDetailsForm = (shop: CommonShopFragment) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(ShopDetailsFormSchema),
    defaultValues: {
      name: shop.name,
      email: shop.email,
      phoneNumber: shop.phoneNumber,
      fb: shop.socials?.facebook ?? undefined,
      ig: shop.socials?.instagram ?? undefined,
      tw: shop.socials?.twitter ?? undefined,
      logo: shop.logo ?? undefined
    }
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return {
    ...form,
    shop,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

type FormValues = z.infer<typeof ShopDetailsFormSchema>;

export const useShopDetailsFormContext = () => useFormContext<FormValues>();
