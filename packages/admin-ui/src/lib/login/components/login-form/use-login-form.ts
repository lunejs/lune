import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLogin } from './use-login';

export const useLoginForm = () => {
  const { isLoading, login } = useLogin();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: FormInput) => {
    login(data);
  };

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required')
});

type FormInput = z.infer<typeof schema>;
