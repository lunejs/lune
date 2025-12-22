import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import z from 'zod';

import { type CommonProductForTranslationFragment, Locale } from '@/lib/api/types';
import { useAddProductTranslation } from '@/lib/product/hooks/use-add-product-translation';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { buildProductTranslateFormDefaultValues as buildDefaultValues } from './default-values';

export const useTranslateProductForm = (product: CommonProductForTranslationFragment) => {
  const { loading, success, failure } = useLoadingNotification();
  const { addProductTranslation } = useAddProductTranslation();

  const form = useForm<TranslateProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(product, Locale.En)
  });

  useEffect(() => {
    form.reset(buildDefaultValues(product, Locale.En));
  }, [product]);

  const onSubmit = async (values: TranslateProductFormValues) => {
    loading('Saving...');

    const result = await addProductTranslation(product.id, {
      ...values,
      locale: Locale.En,
      customFields: Object.entries(values.customFields).map(([key, value]) => ({ id: key, value }))
    });

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
  description: z.string().optional(),
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional()
    })
  ),
  optionValues: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional()
    })
  ),
  customFields: z.record(z.string(), z.any())
});

export type TranslateProductFormValues = z.infer<typeof schema>;

export const useTranslateProductFormContext = () => useFormContext<TranslateProductFormValues>();
