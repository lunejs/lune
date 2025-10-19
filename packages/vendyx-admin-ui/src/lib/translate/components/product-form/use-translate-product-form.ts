import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import z from 'zod';

import { type CommonProductForTranslationFragment, Locale } from '@/lib/api/types';
import { useAddProductTranslation } from '@/lib/product/hooks/use-add-product-translation';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useTranslateProductForm = (product: CommonProductForTranslationFragment) => {
  const { loading, success, failure } = useLoadingNotification();
  const { addProductTranslation } = useAddProductTranslation();
  const translation = product.translations.find(t => t.locale === Locale.En);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: translation?.name ?? '',
      description: translation?.description ?? ''
    }
  });

  useEffect(() => {
    form.reset({
      name: translation?.name ?? '',
      description: translation?.description ?? ''
    });
  }, [product]);

  const onSubmit = async (values: FormValues) => {
    loading('Saving...');

    const result = await addProductTranslation(product.id, { ...values, locale: Locale.En });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    form.reset(values);

    success('Translation updated');
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().optional(),
  description: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export const useTranslateProductFormContext = () => useFormContext<FormValues>();
