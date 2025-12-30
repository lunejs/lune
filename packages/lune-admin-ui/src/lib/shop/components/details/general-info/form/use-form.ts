import { zodResolver } from '@hookform/resolvers/zod';
import { notification, useDialogContext } from '@lunejs/ui';
import { useForm, useFormContext } from 'react-hook-form';
import type z from 'zod';

import type { CommonShopFragment } from '@/lib/api/types';
import { useUpdateShop } from '@/lib/shop/hooks/use-update-shop';

import { ShopGeneralInfoFormSchema } from './form-schema';

export const useShopGeneralInfoForm = (shop: CommonShopFragment) => {
  const dialogContext = useDialogContext();
  const { updateShop } = useUpdateShop();

  const form = useForm<FormValues>({
    resolver: zodResolver(ShopGeneralInfoFormSchema),
    defaultValues: {
      name: shop.name,
      email: shop.email,
      phoneNumber: shop.phoneNumber
    }
  });

  const onSubmit = async (values: FormValues) => {
    const result = await updateShop(shop.id, values);

    if (!result.isSuccess) {
      form.setError('root', { message: result.error });
      return;
    }

    dialogContext.setIsOpen(false);
    notification.success('Shop updated');
  };

  return {
    ...form,
    rootError: form.formState.errors.root?.message,
    shop,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

type FormValues = z.infer<typeof ShopGeneralInfoFormSchema>;

export const useShopDetailsFormContext = () => useFormContext<FormValues>();
