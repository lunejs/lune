import { zodResolver } from '@hookform/resolvers/zod';
import { notification, useDialogContext } from '@lunejs/ui';
import { useForm, useFormContext } from 'react-hook-form';
import type z from 'zod';

import type { CommonShopFragment } from '@/lib/api/types';
import { useUpdateShop } from '@/lib/shop/hooks/use-update-shop';

import { ShopSocialsFormSchema } from './form-schema';

export const useShopSocialsForm = (shop: CommonShopFragment) => {
  const dialogContext = useDialogContext();
  const { updateShop } = useUpdateShop();

  const form = useForm<FormValues>({
    resolver: zodResolver(ShopSocialsFormSchema),
    defaultValues: {
      facebook: shop.socials?.facebook ?? '',
      instagram: shop.socials?.instagram ?? '',
      twitter: shop.socials?.twitter ?? ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    const result = await updateShop(shop.id, { socials: values });

    if (!result.isSuccess) {
      form.setError('root', { message: result.error });
      return;
    }

    dialogContext.setIsOpen(false);
    notification.success('Socials updated');
  };

  return {
    ...form,
    rootError: form.formState.errors.root?.message,
    shop,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

type FormValues = z.infer<typeof ShopSocialsFormSchema>;

export const useShopSocialsFormContext = () => useFormContext<FormValues>();
