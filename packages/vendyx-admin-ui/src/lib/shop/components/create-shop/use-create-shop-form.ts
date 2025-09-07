import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { ShopErrorCode } from '@/lib/api/types';

import { notification } from '@vendyx/ui';
import { useCreateShop } from '../../hooks/use-create-shop';

export const useCreateShopForm = () => {
  const { isLoading, createShop } = useCreateShop();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: ''
    }
  });

  const onSubmit = async (values: FormInput) => {
    const result = await createShop(values);

    if (result?.error) {
      if (result.errorCode === ShopErrorCode.EmailAlreadyExists) {
        form.setError('email', { message: result.error });
        return;
      }

      notification.error(result.error);
    }
  };

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  phoneNumber: z.string().min(1, 'Phone number is required')
});

type FormInput = z.infer<typeof schema>;
