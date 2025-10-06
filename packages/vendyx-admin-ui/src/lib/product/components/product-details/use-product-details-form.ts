import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/forms/form-messages';

import { useCreateProduct } from '../../hooks/use-create-product';

export const useProductDetailsForm = () => {
  const { createProduct } = useCreateProduct();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      enabled: true,
      name: '',
      description: ''
    }
  });

  const onSubmit = async (input: FormInput) => {
    await createProduct({
      name: input.name,
      description: input.description,
      enabled: input.enabled,
      images: new FormData()
    });
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
  enabled: z.boolean()
});

type FormInput = z.infer<typeof schema>;

export const useProductDetailsFormContext = () => useFormContext<FormInput>();
