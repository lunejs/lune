import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { notification } from '@vendyx/ui';

import { FormMessages } from '@/lib/shared/forms/form-messages';
import { isArray } from '@/lib/shared/utils/arrays.utils';

import { useCreateProduct } from '../../hooks/use-create-product';

export const useProductDetailsForm = () => {
  const navigate = useNavigate();
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
    try {
      const images = new FormData();

      if (isArray(input.images)) {
        input.images.forEach(img => images.append('files', img, img.name));
      }

      await createProduct({
        name: input.name,
        description: input.description,
        enabled: input.enabled,
        images: images
      });

      navigate('/products');
    } catch (error) {
      console.error(error);
      notification.error('An unexpected error occurred');
    }
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
