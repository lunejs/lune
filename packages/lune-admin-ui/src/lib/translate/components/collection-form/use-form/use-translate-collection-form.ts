import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import z from 'zod';

import { type CommonCollectionForTranslationFragment, Locale } from '@/lib/api/types';
import { useAddCollectionTranslation } from '@/lib/collections/hooks/use-add-collection-translation';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { buildCollectionTranslateFormDefaultValues as buildDefaultValues } from './default-values';

export const useTranslateCollectionForm = (collection: CommonCollectionForTranslationFragment) => {
  const { loading, success, failure } = useLoadingNotification();
  const { addCollectionTranslation } = useAddCollectionTranslation();

  const form = useForm<TranslateCollectionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(collection, Locale.En)
  });

  useEffect(() => {
    form.reset(buildDefaultValues(collection, Locale.En));
  }, [collection]);

  const onSubmit = async (values: TranslateCollectionFormValues) => {
    loading('Saving...');

    const result = await addCollectionTranslation(collection.id, { ...values, locale: Locale.En });

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

export type TranslateCollectionFormValues = z.infer<typeof schema>;

export const useTranslateCollectionFormContext = () =>
  useFormContext<TranslateCollectionFormValues>();
