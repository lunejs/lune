import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';

import type { CommonCustomObjectDefinitionFragment } from '@/lib/api/types';

import { CustomObjectEntrySchema as schema } from './form-schema';

export const useCustomObjectEntryForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customFields: {}
    }
  });

  const onSubmit = (values: FormValues) => {
    console.log({ values });
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

type FormValues = z.infer<typeof schema>;

export const useProductDetailsFormContext = (): HookReturn => {
  return useFormContext<FormValues>() as HookReturn;
};

type HookReturn = UseFormReturn<FormValues> & {
  definition?: CommonCustomObjectDefinitionFragment;
};
