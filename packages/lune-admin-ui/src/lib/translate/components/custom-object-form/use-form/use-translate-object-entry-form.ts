import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import z from 'zod';

import { type CommonCustomObjectEntryForTranslationFragment, Locale } from '@/lib/api/types';
import { useAddCustomObjectEntryTranslation } from '@/lib/custom-object-entry/hooks/use-add-custom-object-entry-translation';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { buildObjectEntryTranslateFormDefaultValues as buildDefaultValues } from './default-values';

export const useTranslateObjectEntryForm = (
  entry: CommonCustomObjectEntryForTranslationFragment
) => {
  const { loading, success, failure } = useLoadingNotification();
  const { addCustomObjectEntryTranslation } = useAddCustomObjectEntryTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(entry, Locale.En)
  });

  useEffect(() => {
    form.reset(buildDefaultValues(entry, Locale.En));
  }, [entry]);

  const onSubmit = async (values: FormValues) => {
    loading('Saving...');

    const result = await addCustomObjectEntryTranslation(entry.id, {
      locale: Locale.En,
      values: Object.entries(values.customFields).map(([key, value]) => ({ id: key, value }))
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
  customFields: z.record(z.string(), z.any())
});

type FormValues = z.infer<typeof schema>;

export const useTranslateCustomObjectEntryFormContext = () => useFormContext<FormValues>();
