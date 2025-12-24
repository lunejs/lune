import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';

import { type CommonCustomObjectDefinitionFragment } from '@/lib/api/types';

import { CustomObjectFormSchema as schema } from './form-schema';

export const useCustomObjectForm = () => {
  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: '',
      displayField: 'auto',
      fields: [{ name: '', quantity: 'single', type: '' }]
    }
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof schema>;

export const useCustomObjectFormContext = () => useFormContext<FormValues>() as Return;

type Return = UseFormReturn<FormValues> & { definition?: CommonCustomObjectDefinitionFragment };
