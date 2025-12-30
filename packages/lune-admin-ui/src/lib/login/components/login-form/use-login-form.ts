import { zodResolver } from '@hookform/resolvers/zod';
import { notification } from '@lunejs/ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { useLogin } from '../../hooks/use-login';

export const useLoginForm = () => {
  const navigate = useNavigate();

  const { isLoading, login } = useLogin();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: FormInput) => {
    const result = await login(data);

    if (!result.isSuccess) {
      notification.error(result.error);
      return;
    }

    navigate('/shops');
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
